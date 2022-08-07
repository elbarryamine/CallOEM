import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserSignin } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserSchemaType } from './entities/user.schema';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SignUserInput } from './dto/signin-user.input';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  UsersCodesDocument,
  UsersCodesSchemaType,
} from './entities/usersCodes.schema';
import sendVerifyCodeEmail from 'src/services/email/sendVerifyCodeEmail';
import { promises } from 'fs';
import { join } from 'path';
import signUpValidate from 'src/services/validation/signup';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @InjectModel(UserSchemaType.name) private UserModule: Model<UserDocument>,
    @InjectModel(UsersCodesSchemaType.name)
    private UsersCodesModule: Model<UsersCodesDocument>,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => User)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    await signUpValidate(createUserInput);

    const { password, passwordConfirm, email, username } = createUserInput;
    // check if password & passconfirm match
    if (password !== passwordConfirm) {
      throw new HttpException(
        { message: 'password does not match passwordConfirm' },
        400,
      );
    }
    // check if email being used
    const userHasSameEmail = await this.UserModule.findOne({ email });
    if (userHasSameEmail) {
      throw new HttpException(
        { message: 'email is assigned with another account' },
        400,
      );
    }
    // check if username being used
    const userHasSameUsername = await this.UserModule.findOne({ username });
    if (userHasSameUsername) {
      throw new HttpException(
        { message: 'username is assigned with another account' },
        400,
      );
    }
    // should hash password
    const hashedPass = await hash(password, 10);
    const pathToImages = join(process.cwd(), 'src/assets/upload/avatar');
    const files = await promises.readdir(pathToImages);
    const avatar: string = files[Math.floor(Math.random() * files.length)];
    return await this.UserModule.create({
      email,
      password: hashedPass,
      username,
      avatar,
    });
  }

  @Query(() => UserSignin)
  async signIn(@Args('signUserInput') signUserInput: SignUserInput) {
    const { identifier, password } = signUserInput;
    // get user by email or username
    const user = await this.UserModule.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    // check if user and password match
    if (!user) {
      throw new HttpException(
        { message: 'wrong email/username & password' },
        400,
      );
    }
    const match = await compare(password, user.password);
    if (!match) {
      throw new HttpException(
        { message: 'wrong email/username & password' },
        400,
      );
    }
    if (!user.isEmailVerified) return { user };
    // send user and token
    return {
      user,
      token: this.jwtService.sign({ id: user.id }),
    };
  }
  @Mutation(() => Boolean)
  async sendVerifyEmailCode(@Args('email') email: string) {
    // generate code
    // check if user not already verified
    const user = await this.UserModule.findOne({ email }).lean();
    if (user.isEmailVerified) {
      throw new HttpException(
        { message: 'user already verified' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const code = Math.floor(Math.random() * 999999)
      .toString()
      .padStart(6, '0');
    // save code to codes collection with email and code
    const userCode = await this.UsersCodesModule.findOneAndUpdate(
      { email },
      { code },
    ).lean();
    if (!userCode) {
      await this.UsersCodesModule.create({ email, code });
    }
    // send Code to email adresss
    return await sendVerifyCodeEmail({ code, email });
  }
  @Mutation(() => Boolean)
  async verifyEmailCode(
    @Args('email') email: string,
    @Args('code') code: string,
  ) {
    // Query codes database by given email
    const userCodeDoc = await this.UsersCodesModule.findOne({ email }).lean();
    // check if code is matched and isNotExpired
    const dateDiff =
      new Date(Date.now()).getTime() - userCodeDoc.createdAt.getTime();
    const expired = dateDiff / 1000 / 60 / 60 >= 1;
    if (userCodeDoc.code === code && !expired) {
      // find user by email and update isVerified to true
      await this.UserModule.findOneAndUpdate(
        { email },
        { isEmailVerified: true },
      );
      return true;
    }
  }
}

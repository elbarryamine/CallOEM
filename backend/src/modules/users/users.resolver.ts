import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserSignin } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserSchemaType } from './entities/user.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { SignUserInput } from './dto/signin-user.input';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  UsersCodesDocument,
  UsersCodesSchemaType,
} from './entities/usersCodes.schema';
import sendVerifyCodeEmail from 'src/services/email/sendVerifyCodeEmail';

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
    try {
      const { password, passwordConfirm, email, username } = createUserInput;

      // check if password & passconfirm match
      if (password !== passwordConfirm) {
        return new HttpException(
          { message: 'password does not match passwordConfirm' },
          400,
        );
      }

      // check if email being used

      const userHasSameEmail = await this.UserModule.findOne({ email });
      if (userHasSameEmail) {
        return new HttpException(
          { message: 'email is assigned with another accound' },
          400,
        );
      }

      // check if username being used
      const userHasSameUsername = await this.UserModule.findOne({ username });
      if (userHasSameUsername) {
        return new HttpException(
          { message: 'username is assigned with another accound' },
          400,
        );
      }

      // should hash password
      const hashedPass = await hash(password, 10);

      return await this.UserModule.create({
        email,
        password: hashedPass,
        username,
      });
    } catch {
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  @Query(() => UserSignin)
  async signIn(@Args('signUserInput') signUserInput: SignUserInput) {
    try {
      const { identifier, password } = signUserInput;
      // get user by email or username
      const user = await this.UserModule.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      // check if user and password match

      if (!user) {
        return new HttpException(
          { message: 'wrong email/username & password' },
          400,
        );
      }
      const match = await compare(password, user.password);
      if (!match) {
        return new HttpException(
          { message: 'wrong email/username & password' },
          400,
        );
      }

      if (!user.isEmailVerified) {
        return new HttpException({ message: 'email not verified' }, 400);
      }

      // send user and token

      return {
        user,
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch {
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }

  @Mutation(() => Boolean)
  async sendVerifyEmailCode(@Args('email') email: string) {
    // generate code
    try {
      const code = Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, '0');

      // save code to codes collection with email and code
      const isFound = await this.UsersCodesModule.findOneAndUpdate(
        { email },
        { code },
      );
      if (!isFound) {
        await this.UsersCodesModule.create({ email, code });
      }
      // send Code to email adresss
      console.log(process.env.MobileAppName);
      return await sendVerifyCodeEmail({ code, email });
    } catch {
      throw new HttpException({ message: 'something went wrong' }, 400);
    }
  }
  @Mutation(() => Boolean)
  async verifyEmailCode() {
    // @Args('email') email: string, // @Args('code') Code: string,
    // Query codes database by given email
    // check if code is matched
    // find user by email and update isVerified to true
  }
}

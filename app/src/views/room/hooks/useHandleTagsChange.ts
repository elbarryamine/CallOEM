import {useState} from 'react';

export default function useHandleTagsChange() {
  const [tags, setTags] = useState<Array<string>>([]);

  const handleSelectTags = (setValue: SetValue, value: string) => {
    const isTagUsed = tags.find(
      tag => tag.toLowerCase() === value.toLowerCase(),
    );
    if (isTagUsed) return;
    const capitalizedTag = value
      .split(' ')
      .map((word: string) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(' ');

    setValue('Tags', [...tags, capitalizedTag]);
    setTags(prevTags => [...prevTags, capitalizedTag]);
  };

  const handleDeleteTag = (setValue: SetValue, value: string) => {
    const filterdTag = tags.filter(
      tag => tag.toLowerCase() !== value.toLowerCase(),
    );

    setValue('Tags', filterdTag);
    setTags(filterdTag);
  };

  return {handleSelectTags, tags, setTags, handleDeleteTag};
}

export type SetValue = (
  field: string,
  value: unknown,
  shouldValidate?: boolean | undefined,
) => void;

export type SetTouched = (
  field: string,
  value: boolean | undefined,
  shouldValidate?: boolean | undefined,
) => void;

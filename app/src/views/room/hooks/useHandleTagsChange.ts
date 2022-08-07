import {useState} from 'react';

export default function useHandleTagsChange() {
  const [tags, setTags] = useState<Array<string>>([]);

  const handleSelectTags = (setValue: SetValue, value: string) => {
    setValue(value);
    const isTagUsed = tags.find(
      tag => tag.toLowerCase() === value.toLowerCase(),
    );
    if (isTagUsed) return;
    const capitalizedTag = value
      .split(' ')
      .map((word: string) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(' ');

    setTags(prevTags => [...prevTags, capitalizedTag]);
  };
  return {handleSelectTags, tags, setTags};
}

type SetValue = (value: string) => void;

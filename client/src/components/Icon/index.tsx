import { createElement } from 'react';
import { IconBaseProps } from 'react-icons';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const icons = {
  likeEmpty: AiOutlineHeart,
  likeField: AiFillHeart,
};

const Icon = ({ name, ...restProps }: { name: keyof typeof icons } & IconBaseProps) => {
  return createElement(icons[name], restProps);
};

export default Icon;

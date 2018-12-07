import pickBy from 'lodash/pickBy';

export const constraints = {
  type: ['image/png', 'image/jpg', 'image/jpeg'],
  maxSize: 2500000,
  titleLength: 30,
  descriptionLength: 140
}

export const fileValidator = (file) => {
  
  if(!file) return "Image required."
  const { type, size } = file;
  if (!constraints.type.find(val => val === type)) {
    return "Invalid file type."
  } else if (size >= constraints.maxSize) {
    return "File is too large"
  } 
}

export const titleValidator = (title) => {
  if (title.length > constraints.titleLength) {
    return `Title should be less than ${constraints.titleLength} characters`;
  }
}

export const descriptionValidator = (description) => {
  if (description.length > constraints.descriptionLength) {
    return `Description should be less than ${constraints.descriptionLength} characters`;
  }
}

export default ({file, title, description}) => {
  const fileErr = {file: fileValidator(file)};
  const titleErr = {title: titleValidator(title)};
  const descErr = {description: descriptionValidator(description)};
  
  return pickBy({...fileErr, ...titleErr, ...descErr}, err => err !== undefined);
}

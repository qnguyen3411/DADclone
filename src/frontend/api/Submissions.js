import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';

import moment from 'moment';
import {DATE_FORMAT} from '../constants/App';
import { arrayToIdObject } from '../helpers';

const today = moment().format(DATE_FORMAT);
const yesterday = moment().subtract(1, 'd').format(DATE_FORMAT);

const data ={
  '1': {
    id: 1,
    title: 'Sub1',
    posterId: '1',
    description: 'test',
    createdAt: today,
    url: img1
  },
  '2': {
    id: 2,
    title: 'Sub2',
    posterId: '1',
    description: 'test',
    createdAt: today,
    url: img2
  },
  '3': {
    id: 3,
    title: 'Sub3',
    posterId: '1',
    description: 'test',
    createdAt: yesterday,
    url: img3
  },
  '4' : {
    id: 4,
    title: 'Sub4',
    posterId: '2',
    description: 'test',
    createdAt: yesterday,
    url: img4
  },
  '5': {
    id: 5,
    title: 'Sub5',
    posterId: '2',
    description: 'test',
    createdAt: yesterday,
    url: img5
  },
  '6' : {
    id: 6,
    title: 'Sub6',
    posterId: '2',
    description: 'test',
    createdAt: yesterday,
    url: img6
  },
  '7': {
    id: 7,
    title: 'Sub7',
    posterId: '2',
    description: 'test',
    createdAt: yesterday,
    url: img7
  },
  '8': {
    id: 8,
    title: 'Sub8',
    posterId: '2',
    description: 'test',
    createdAt: yesterday,
    url: img8
  },
  '9' : {
    id: 9,
    title: 'Sub9',
    posterId: '2',
    description: 'test',
    createdAt: today,
    url: img9
  },
}


export const fetchByDate = (date) => {
  return Promise.resolve(
    arrayToIdObject(
      Object.values(data)
        .filter(submission => 
          moment(date).isSame(submission.createdAt), 'day'))
    )
} 

// TODO: Change it so query is username
export const fetchByUser = (id) => {
  return Promise.resolve(
    arrayToIdObject(
      Object.values(data)
        .filter(submission => submission.posterId === id))
    )
}

export const addSubmission = ({file, title, description}) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const newItem = {
        id: Object.keys(data).length + 1,
        title,
        description,
        posterId: 1,
        createdAt: today,
        url: reader.result
      }
      data[newItem.id] = newItem ;
      resolve(newItem)
    };
    reader.readAsDataURL(file);
  })
}

export const fetch = (query) => {
  if(query.type === 'date') {
    return fetchByDate(query.value);
  } else if (query.type === 'user') {
    return fetchByUser(query.value);
  }
}
import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Button, Container, Message, Title } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {timeParts, hasConflict, getCourseNumber, getCourseTerm} from './times';

//firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDvrOc8Xn2SfgtgRHlBt9ecsMaPtRslJ7Q",
  authDomain: "quick-react.firebaseapp.com",
  databaseURL: "https://quick-react.firebaseio.com",
  projectId: "quick-react",
  storageBucket: "",
  messagingSenderId: "975384769402",
  appId: "1:975384769402:web:203e82e6ec5c92e74e1cc3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const saveCourse = (course, meets) => {
    db.child('courses').child(course.id).update({meets})
      .catch(error => alert(error));
};

const buttonColor = selected => (
    selected ? 'success' : null
);
  
const moveCourse = course => {
    const meets = prompt('Enter new meeting data, in this format:', course.meets);
    if (!meets) return;
    const {days} = timeParts(meets);
    if (days) saveCourse(course, meets); 
    else moveCourse(course);
};
  
const Course = ({ course, state, user }) => (
    <Button color={ buttonColor(state.selected.includes(course)) }
      onClick={ () => state.toggle(course) }
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </Button>
);

export default Course;
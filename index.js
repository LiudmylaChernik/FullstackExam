//1


/* 1. Can you provide a brief summary of what is happening in this function code? */

function countReducer(state = initialState, action) { 
    if(action.type === 'increment') { 
        return {value: state.value +1 } 
    } 
    return state 
}

/*
The countReducer function is a simple reducer function used in state management 
with Redux in React applications.

The function countReducer takes two arguments state and action.
The state argument has a default value of initialState.

The function checks if the action.type is 'increment'.
If it is, the function returns a new state object where the value property is incremented by 1.

If the action.type is not 'increment', the function returns the current state unchanged.
*/

/* 2. Add one function that tells the reducer to reduce the state value by 1 */

function countReducer(state = initialState, action) {
    if (action.type === 'increment') {
      return { value: state.value + 1 };
    } else if (action.type === 'decrement') {
      return { value: state.value - 1 };
    }
    return state;
  }

/* 3. Add one action that tells the reducer to reset the state */

function countReducer(state = initialState, action) {
    if (action.type === 'increment') {
      return { value: state.value + 1 };
    } else if (action.type === 'decrement') {
      return { value: state.value - 1 };
    } else if (action.type === 'reset') {
      return initialState; 
    }
    return state;
  }


//2 

/* 1. Can you provide a brief summary on what is happening on line 34-39? */

/* 
The useState hook initializes a state variable named studentsCount with a default value of 0.
studentsCount represents the number of students currently in the classroom.
setStudentsCount is a function that will be used to update the value of studentsCount.
A div contains a paragraph (<p>) displaying the current number of students in the classroom using the studentsCount variable.
A <button> is provided, but its onClick event handler is not yet defined (onClick={?????}).
*/

/* 2. When a user clicks on the “Add student” button, update the state (studentsCount)
to include only the total number of students who are present. Using the data
provided below:*/

import React, { useState } from 'react';

const classInfo = () => {
    const [studentsCount, setStudentsCount] = useState(0);

    const students = [
        { name: 'Nrupul', present: false },
        { name: 'Prateek', present: true },
        { name: 'Jane', present: true },
        { name: 'Paul', present: false },
        { name: 'Luke', present: true }
    ];

    const handleAddStudent = () => {
        const presentStudentsCount = students.filter(student => student.present).length;
        setStudentsCount(presentStudentsCount);
    };

    return (
        <div>
            <p>Number of students in class room: {studentsCount}</p>
            <button onClick={handleAddStudent}>Add student</button>
        </div>
    );
}

/* 

a. Write a pseudocode of how your function would look

Define a function classInfo
    Initialize studentsCount to 0 using useState
    Initialize setStudentsCount as the function to update studentsCount

    Define an array students with objects representing each student
        Each object contains:
            name: String
            present: Boolean (true or false)

    Define a function handleAddStudent
        Set presentStudentsCount to the number of students in the array where present is true
        Call setStudentsCount with presentStudentsCount to update the state

    Return the JSX structure
        Display a paragraph showing the current studentsCount
        Display a button labeled "Add student"
            Set the button's onClick event to call handleAddStudent

End function

b. How do you ensure that the function is triggered when the button is clicked?

To ensure that the function is triggered when the button is clicked, 
I need to properly set the onClick event handler of the button to the function I want to execute.
This is done by assigning the function to the onClick attribute of the button element. 
When the button is clicked, the function is executed.

c. How will you update the state with the result of your function?

To update the state with the result of the function, I will use the setStudentsCount function 
provided by the useState hook. This function will allow me to update the studentsCount state 
with the new value calculated inside the handleAddStudent function.

*/


//3 


/*
1. A change of code was made on line 174 (figure 4), can you briefly explain what
that would do?

The change on line 174 modifies how the countReducer function handles the 'increment' action type. 
state.value represents the current value stored in the state. Initially set to 0.
action.payload represents additional data sent with the action.
In this context, it specifies the amount by which the state.value should be incremented.
state.value + action.payload adds the current value (state.value) to the value provided by action.payload.
This is for a dynamic increment based on the payload of the dispatched action.
After the change the reducer increments the value by a variable amount specified by action.payload.


2. Let’s say we don’t want to set the state locally anymore and want to use dispatch.
How would you ensure that an “increment” action that also contains the result of
the studentCount is dispatched on button click? According to your answer in
part 2.2b what would need to be changed?

To dispatch an "increment" action that contains the result of studentsCount on button click, I need to use the useDispatch Hook 
from react-redux to get the dispatch function.
Create an Action Object for the 'increment' action that includes the calculated studentsCount as the payload.
Dispatch the Action when the button is clicked.
*/

import React from 'react';
import { useDispatch } from 'react-redux';

const ClassInfo = () => {
  
    const dispatch = useDispatch();

    const students = [
        { name: 'Nrupul', present: false },
        { name: 'Prateek', present: true },
        { name: 'Jane', present: true },
        { name: 'Paul', present: false },
        { name: 'Luke', present: true }
    ];

    const handleAddStudent = () => {

        const presentStudentsCount = students.filter(student => student.present).length;

        dispatch({
            type: 'increment',
            payload: presentStudentsCount
        });
    };

    return (
        <div>
            <button onClick={handleAddStudent}>Add student</button>
        </div>
    );
}

export default ClassInfo;

/* 

3. Which code do you think is best suited to ensure that the “increment” action
updates the state with the correct total number of students who are present. Is
it Figure 4? Or Figure 5? Explain the code difference and your reasoning

First version of the countReducer takes the current state (state.value) and adds the action.payload to it.
If action.payload contains the number of present students in the class, 
this version will accumulate the total number of present students each time the action is dispatched.
If the number of present students is 3, and then 2 more students are added later, the state will be updated to 5.

Second version of the countReducer replaces the current state (state.value) with the action.payload.
This overwrites the value in the state with the latest count of present students.
If the number of present students is 3, and then 2 more students are counted later, 
the state will be updated to 2 instead of accumulating the count.

Best choice is first Version
The first version ensures that each new count of present students is added to the existing total, 
which aligns with what you'd expect when counting the total number of students over multiple actions.
The second version is less ideal because it replaces the current total with the latest count, 
which could lead to incorrect totals if the intention is to keep a running total of all present students.

*/

// Code challenge

function isPalindrome(str) {
  
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    const reversedStr = cleanedStr.split('').reverse().join('');
    
    return cleanedStr === reversedStr;
}

console.log(isPalindrome('A man, a plan, a canal, Panama'));
console.log(isPalindrome('radar')); 
console.log(isPalindrome('pencil')); 
console.log(isPalindrome('a'));


//Theory challenge

/*
1. Definition and explanation of SQL Injection
Define SQL injection and explain how it occurs in applications that utilise a database backend. 
Provide an example to aid your explanation

SQL Injection is a type of attack where an attacker manipulates a database query 
by inserting malicious code into a user input field. This can allow the attacker 
to gain unauthorized access to data, modify it, or even delete it
It occurs when an application takes input from a user (like a username or password) 
and directly uses it to build a SQL query to interact with the database. 
If this input isn't properly handled, the attacker can insert special characters 
or SQL commands that change the meaning of the query.

In a login form where you enter a username and password. The application checks your credentials: 
SELECT * FROM users WHERE username = 'userInput' AND password = 'userInput';
If an attacker types this into the username field:
Username: admin' --
Password: (anything)
The SQL query looks lite this:
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything';
The -- makes the rest of the query a comment, so the password check is ignored. 
The query checks if the username is 'admin', logging the attacker in as the admin.

2. Types of SQL Injection Attacks
Describe two different types of SQL Injection attacks

Classic SQL Injection (In-Band SQL Injection)
This is the most straightforward and common type of SQL injection. 
In this type of attack, the attacker directly manipulates the SQL query 
in a way that allows them to retrieve or modify data from the database. 
The attack is executed using the same communication channel as the original request, 
typically through a web application form, URL, or query parameter.

Blind SQL Injection
This one occurs when an application is vulnerable to SQL injection, 
but the results of the attack are not directly visible to the attacker. 
Instead of seeing the result of their query, the attacker receives a true or false response 
based on the query's success. This type of attack is more challenging and time-consuming 
because the attacker must deduce the information from the application's behavior rather than seeing it directly.

3. Impact of SQL Injection
Discuss the potential consequences of SQL Injection attacks on the security of the
application, give an example.

SQL Injection attacks can have severe consequences on the security of an application and its underlying database. 
The potential impact of such attacks can range from unauthorized data access to complete control over the database server. 
Possible consequences after such attacks can be Unauthorized data access, data manipulation, 
data deletion, remote code execution, denial of service (DoS), reputation damage.

4. Mitigation strategies
Outline mitigation strategies to prevent successful SQL Injection vulnerabilities in full stack applications.

Full-stack applications require a combination of secure coding practices, proper input handling, 
and robust security measures across both the frontend and backend.

Usage of parameterized queries ensure that user input is treated strictly as data, not executable code. 
By using placeholders for input data, you prevent the possibility of SQL commands being injected.

Validation and sanitizing all user inputs to ensure they are of expected formats, types, 
and constraints before processing them. (Like lenghth check, only allow characters or data formats that are explicitly expected,
regex patterns to validate formats like emails and phone numbers)

Escaping special characters in user inputs can help prevent SQL injection by neutralizing the characters 
that have special meaning in SQL.

Ensure that the database user accounts used by your application have the minimum permissions necessary.

A Web Application Firewalls can detect and block SQL injection attempts by analyzing incoming requests for known attack patterns.

Regularly testing your application for vulnerabilities, including SQL injection, helps identify potential security issues.

Proper errors handling can ensure that database errors and stack traces are not exposed to users.
*/
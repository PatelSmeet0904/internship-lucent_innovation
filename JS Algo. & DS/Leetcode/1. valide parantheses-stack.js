var isValid = function (s) {
  const stack = [];
  const checkObj = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (let i = 0; i < s.length; i++) {
    if (s[i] === checkObj[stack[stack.length - 1]]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length === 0;
};

console.log(isValid("([])["));

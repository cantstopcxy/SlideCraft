import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia as syntaxStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeComponent = ({ code, language, style }) => {
  // You should directly use syntaxStyle for the SyntaxHighlighter's style prop
  // Combine your custom styles in customStyle prop for additional container styling
  const combinedStyle = {
    ...style,
    whiteSpace: 'pre-wrap', // Ensures that whitespaces are considered in wrapping
    wordBreak: 'break-word', // Allows words to break and wrap onto the next line
    overflowX: 'auto' // Allows horizontal scrolling if needed
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={syntaxStyle} // Apply the syntax highlighting theme
      customStyle={combinedStyle} // Apply custom styles to the container
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeComponent;

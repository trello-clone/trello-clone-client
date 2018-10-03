import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...otherProps } = this.props;
    return (
      <input className={`kn-input ${className}`} {...otherProps}/>
    );
  }
}

export default Input;

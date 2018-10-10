import React from 'react';
import PropTypes from 'prop-types';

class Column extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data, } = this.props;
    return (
      <div className='column'>
        <div className='column-content-wrapper'>
          <div className='column-name'>{ data.name }</div>
          <div className='column-content'></div>
        </div>
      </div>
    );
  }
}

export default Column;

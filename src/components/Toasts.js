import React from 'react';
import { Message, Transition } from 'semantic-ui-react';

import './Toasts.css';

class Toasts extends React.Component {

  render() {
    return (
      <div className='toast-container'>
        {
          this.props.toasts.map(t => {
            return (
              <ToastAlert type={t.type} title={t.title} content={t.content} />
            );
          })
        }
      </div>
    );
  }
}

class ToastAlert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  
  render() {

    return(
      <Transition visible={this.state.open} animation='fade up' duration={400} unmountOnHide transitionOnMount>
        <Message
          floating
          onDismiss={() => this.setState({ open: false })}
          warning={this.props.type === 'warning'}
          negative={this.props.type === 'danger'}
          positive={this.props.type === 'success'}
          header={this.props.title}
          content={this.props.content}
        />
      </Transition>
    )
  }
}

export default Toasts;
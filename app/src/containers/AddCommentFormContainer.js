import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

const formStyles = {
  formContainer: {
    marginTop: '2em',
  },
  formItemLayout: {
    labelCol: {
      xs: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
    },
  },
};

class AddCommentWrapper extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  componentDidUpdate(prevProps) {
    const { addCommentLoading } = this.props;
    if (prevProps.addCommentLoading !== addCommentLoading) {
      this.setState({
        confirmLoading: addCommentLoading,
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = parentId => e => {
    e.preventDefault();

    const { form, onAddComment } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onAddComment({ ...values, parentId });
        setTimeout(() => {
          form.resetFields();
          this.setState({
            visible: false,
          });
        }, 500);
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { buttonTitle, icon, type, parentId } = this.props;
    const { getFieldDecorator } = this.props.form;
    const buttonIcon = icon ? { icon: icon } : '';
    const buttonType = type ? { type: type } : '';

    return (
      <div>
        <Button style={{width: '100%'}} {...buttonIcon} {...buttonType} onClick={this.showModal}>
          {buttonTitle}
        </Button>
        <Modal
          title="Comment Form"
          visible={visible}
          width={700}
          confirmLoading={confirmLoading}
          okText={'Submit'}
          onOk={this.handleSubmit(parentId)}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} style={formStyles.formContainer}>
            <FormItem
              {...formStyles.formItemLayout}
              label={'Author'}
              hasFeedback
            >
              {getFieldDecorator('author', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(<Input placeholder="Author name" />)}
            </FormItem>
            <FormItem
              {...formStyles.formItemLayout}
              label={'Comment'}
              hasFeedback
            >
              {getFieldDecorator('body', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your comment!',
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddCommentWrapper);

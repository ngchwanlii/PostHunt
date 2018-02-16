import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { capitalize } from '../utils';

const FormItem = Form.Item;
const Option = Select.Option;
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

class AddPostWrapper extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  componentDidUpdate(prevProps) {
    const { addPostLoading } = this.props;
    if (prevProps.addPostLoading !== addPostLoading) {
      this.setState({
        confirmLoading: addPostLoading,
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onAddPost } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onAddPost(values);
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
    const { buttonTitle, categories, icon, type } = this.props;
    const { getFieldDecorator } = this.props.form;
    const buttonIcon = icon ? { icon: icon } : '';
    const buttonType = type ? { type: type } : '';

    return (
      <div>
        <Button {...buttonIcon} {...buttonType} onClick={this.showModal}>
          {buttonTitle}
        </Button>
        <Modal
          title="Post Form"
          visible={visible}
          width={700}
          confirmLoading={confirmLoading}
          okText={'Submit'}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} style={formStyles.formContainer}>
            <FormItem
              {...formStyles.formItemLayout}
              label={'Title'}
              hasFeedback
            >
              {getFieldDecorator('title', {
                rules: [
                  { required: true, message: 'Please input your post title!' },
                ],
              })(<Input placeholder="Post Title" />)}
            </FormItem>
            <FormItem
              {...formStyles.formItemLayout}
              label={'Author'}
              hasFeedback
            >
              {getFieldDecorator('author', {
                rules: [
                  { required: true, message: 'Please input your post author!' },
                ],
              })(<Input placeholder="Post Author" />)}
            </FormItem>
            <FormItem
              {...formStyles.formItemLayout}
              label="Category"
              hasFeedback
            >
              {getFieldDecorator('category', {
                rules: [
                  { required: true, message: 'Please select post category!' },
                ],
              })(
                <Select placeholder="Please select post category">
                  {categories.map((category, i) => (
                    <Option key={category.name + i} value={category.name}>
                      {capitalize(category.name)}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formStyles.formItemLayout}
              label={'Content'}
              hasFeedback
            >
              {getFieldDecorator('body', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your post content!',
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

export default Form.create()(AddPostWrapper);

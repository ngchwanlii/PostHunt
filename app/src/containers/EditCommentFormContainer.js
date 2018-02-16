import React from 'react';
import { Button, Form, Icon, Input, Modal } from 'antd';

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

class EditCommentWrapper extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    success: false,
  };

  componentDidUpdate(prevProps) {
    const { editLoading } = this.props;
    if (prevProps.editLoading !== editLoading) {
      this.setState({
        confirmLoading: editLoading,
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = id => e => {
    e.preventDefault();

    const { form, onEditComment } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onEditComment(id, { ...values, timestamp: Date.now() }, 'comment');
        this.setState({ success: true });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 1000);
        setTimeout(() => {
          this.setState({ success: false });
        }, 1001);
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, success } = this.state;
    const { data } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Icon type="edit" onClick={this.showModal} />
        <Modal
          title="Edit Comment Form"
          visible={visible}
          width={700}
          confirmLoading={confirmLoading}
          okText={'Submit'}
          onOk={this.handleSubmit(data.id)}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type={success ? '' : 'primary'}
              icon={success ? 'check-circle-o' : ''}
              loading={confirmLoading}
              onClick={this.handleSubmit(data.id)}
            >
              {success ? `Success` : `Submit`}
            </Button>,
          ]}
        >
          <Form
            style={formStyles.formContainer}
          >
            <FormItem
              {...formStyles.formItemLayout}
              label={'Comment'}
              hasFeedback
            >
              {getFieldDecorator('body', {
                initialValue: data.body,
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

export default Form.create()(EditCommentWrapper);

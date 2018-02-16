import React from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {withEdit} from '../hoc/withEdit';
import {withClick} from '../hoc/withClick';

const FormItem = Form.Item;

const {TextArea} = Input;

const formStyles = {
  formContainer: {
    marginTop: '2em'
  },
  formItemLayout: {
    labelCol: {
      xs: {span: 4}
    },
    wrapperCol: {
      xs: {span: 20}
    }
  }
};

class EditPostWrapper extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    success: false
  };

  componentDidUpdate(prevProps) {
    const {editLoading} = this.props;
    if (prevProps.editLoading !== editLoading) {
      this.setState({
        confirmLoading: editLoading
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSubmit = id => e => {
    e.preventDefault();

    const {form, onEdit} = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onEdit(id, {...values}, 'post');
        this.setState({success: true});
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false
          });
        }, 1000);
        setTimeout(() => {
          this.setState({success: false});
        }, 1001);
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {visible, confirmLoading, success} = this.state;
    const {data, uiComponent: UIComponent} = this.props;
    const {getFieldDecorator} = this.props.form;

    const EditUIComponent = withClick(UIComponent);

    return (
      <div>
        <EditUIComponent onClick={this.showModal}/>
        <Modal
          title="Edit Post Form"
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
            </Button>
          ]}
        >
          <Form style={formStyles.formContainer}>
            <FormItem
              {...formStyles.formItemLayout}
              label={'Title'}
              hasFeedback
            >
              {getFieldDecorator('title', {
                initialValue: data.title,
                rules: [
                  {required: true, message: 'Please input your post title!'}
                ]
              })(<Input placeholder="Post Title"/>)}
            </FormItem>
            <FormItem {...formStyles.formItemLayout} label={'Post'} hasFeedback>
              {getFieldDecorator('body', {
                initialValue: data.body,
                rules: [
                  {
                    required: true,
                    message: 'Please input your comment!'
                  }
                ]
              })(<TextArea rows={4}/>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const EditPostForm = Form.create()(EditPostWrapper);

export default withEdit(EditPostForm);

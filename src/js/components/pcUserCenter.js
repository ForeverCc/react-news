import React from 'react';
import PcHeader from './pcHeader';
import PcFooter from './pcFooter';
import { Row, Col, Menu, Card,  Button, message, Tabs,Icon,Modal, Form, Input, notification,Upload } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class PcUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            userValue: '' ,//用户收藏
            userComments:'', //评论
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }
    //获取
    componentDidMount(){

        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    userValue:json
                });
            });
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    userComments:json
                });
            });
    }
    handleCancel = () => {
        this.setState({
            previewVisible: false
        });
    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList })
    };



    render(){
        const { userValue , userComments,previewVisible, previewImage, fileList  } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const userValueList = userValue.length?
            userValue.map(( value, index )=>{
                return(
                    <Card key={ index } title={ value.uniquekey } extra={<a href={`/#/details/${ value.uniquekey }`}>查看</a>}>
                        <p>{ value.Title }</p>
                    </Card>
                )
            })
            :
            '您暂时没有收藏，请收藏一些你喜欢的新闻吧，亲。';

        const userCommentsList= userComments.length?
            userComments.map(( uComments, index )=>{
                return(
                    <Card key={ index } title={`在 ${ uComments.datetime } 评论了文章`} extra={<a href={`/#/details/${ uComments.uniquekey }`}>查看</a>}>
                        <p>{ uComments.Comments }</p>
                    </Card>
                )
            })
            :
            '您暂时没有评论。';
        return(
        <div>
            <PcHeader />
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs>
                        <TabPane tab="我的收藏" key="1">
                            <Row>
                                <Col span={24}>
                                    { userValueList }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="我的评论" key="2">
                            <Row>
                                <Col span={24}>
                                    { userCommentsList }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="设置头像" key="13">
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview.bind(this)}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={1}></Col>
            </Row>

            <PcFooter/>
        </div>

        )
    }
}


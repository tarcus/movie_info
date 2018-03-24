import React, {Component} from 'react'
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome'
import userAvatar from '../images/avatar.png'


Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '320px',
    height: '290px',
    boxShadow: '0 0 4px 0px rgba(0,0,0, 0.3)'
  }
};

class AvatarUpload extends Component {
	constructor(props){
		super(props);

		this.state = {modalIsOpen: false, progress: null, src: null}
	}

	openModal = ()=>{
		this.props.closeUser()
		this.setState({modalIsOpen: true})

	}

	closeModal = ()=>{
		//Сброс состояния при закрытии окна
		this.setState({modalIsOpen: false, fileSize: false, progress: null})
	}


	//Upload img to firestore
	uploadImg = (e)=>{
		e.preventDefault();

		const file = e.target.files[0];

		//get uploading file extension
		const fileExtension = file.name.split('.')[1];


		//Проверяем размер файла
		if(file.size > 80000){
	       console.log("File is too big!")
	       this.setState({fileSize: true })
	       
    	} else {
    	//Сбрасываем сообщение too big
    	this.setState({fileSize: false})

    	//Превью загружаемого файла
    	const reader = new FileReader();
	    reader.onload = (e)=> {
	        // get loaded data and render thumbnail.
	        this.setState({src: e.target.result})
	    }
		reader.readAsDataURL(file);

    	//Путь к файлу в firestore
    	//Имя файла всегда одинаковое чтобы не захламлять firestore
			const userImgRef = firebase.storage().ref('images/' + this.props.user.uid + '/' + 'userpic.' + fileExtension);

			//Uploading
			const task = userImgRef.put(file);

			//Отслеживаем состояние загрузки файла в хранилище
			task.on('state_changed', (snap)=>{
				//Индикация прогресса
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				console.log('Progress: ', percentage, "Snap: ", snap)
				this.setState({progress: percentage, downloadURL: snap.downloadURL}, ()=>{
					//обновляем профиль юзера с новой ссылкой на изображение
					this.props.user.updateProfile({ 
	                    photoURL: this.state.downloadURL  
	            	})

	            	//И закрываем окно загрузки
	            	//this.closeModal();
				})
			}, 
			(error)=>{
				console.log('File Uploading Error: ', error)
			})
    	}
		

		
	}

	render(){

		const fileLimit = this.state.fileSize == true ? 'File size is too big!' : '';
		return(
			<div>
				<span className="btn-light" onClick={this.openModal}>Change Avatar</span>
				<Modal
		          isOpen={this.state.modalIsOpen}
		          onAfterOpen={this.afterOpenModal}
		          onRequestClose={this.closeModal}
		          style={customStyles}
		          contentLabel="Example Modal"
		        >
		 
		          <h2 className="upload-h">Select Profile Image</h2>
		          <div className="upload-preview"><img src={this.state.src==null ? userAvatar : this.state.src} /></div>
		          <div className="upload-size">File size should be less than 80kb</div>
		          <div className="upload-warning">{fileLimit}</div>
		          <span className="close-modal" onClick={this.closeModal}>&times;</span>
		          {this.state.progress==100 && <span className="upload-ok"><FontAwesome name='check' size="2x" className="fa-ok" /></span>}
		          <form>
		             <input type="file" onChange={this.uploadImg} />
		          </form>
		          {this.state.progress!==null && <div className="progress">
		          	<span className="progress-text">{this.state.progress + "%"}</span>
					<div className="progress-bar" style={{width: `${this.state.progress}%`}}></div>
		          </div>}
		          
		        </Modal>
			</div>
		)
	}
}

export default AvatarUpload;
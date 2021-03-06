import React, {Component} from "react";
import {DefaultRoute, RouteHandler, Link, browserHistory} from "react-router";
import $ from "jquery";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

class WorksheetCreator extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	worksheet:{
	  		title: '',
	  		desciption: ''
	  	},
	  	loading: false,
	  	error: false

	  };

	  this.onTitleChange = this.onTitleChange.bind(this);
	  this.onDescriptionChange = this.onDescriptionChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleErrorRequestClose = this.handleErrorRequestClose.bind(this);

	}

	handleErrorRequestClose()  {
	    this.setState({
	      open: false,
	    });
  	};

	onTitleChange(e) {
		this.setState({worksheet:{title: e.target.value, description: this.state.worksheet.description}});
	}

	onDescriptionChange(e) {
		this.setState({worksheet:{title:this.state.worksheet.title,description: e.target.value}});
	}

	handleSubmit(e) {
		this.setState({loading: true});
		if(this.state.worksheet.title.length > 0){
			e.preventDefault();
			$.ajax({
		      url: "http://localhost:3000/api/Worksheets",
		      dataType: 'json',
		      type: 'POST',
		      data: this.state.worksheet,
		      success: function(data) {
		      	browserHistory.push('/worksheet/' + data.id);

		      }.bind(this),
		      error: function(xhr, status, err) {
		      	this.setState({
		      		error: true,
		      		loading: false
	      		})
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
	    	});
		} else {
			this.setState({
				error:true,
				loading: false
			});
		}
	}

	handleCancel(e) {
		e.preventDefault();
		browserHistory.push('/worksheets');
	}

	render() {
		const paperStyle = {
		  height: 350,
		  width: 800,
		  margin: 20,
		  marginTop: '25vh',
		  marginBottom: '25vh',
		  paddingTop: '10vh',
		  textAlign: 'center',
		  display: 'inline-block',
		  border: '2px solid #36BA93'
		};
		const inputStyles = {
		  underlineStyle: {
		    borderColor: '#36BA93',
		  },
		  floatingLabelFocusStyle: {
		  	color: '#36BA93'
		  }
		};

		const titleInputStyle = {
			float: 'left',
			marginLeft: '5vw',
			fontSize: '3.5vh',
			marginTop: '4vh'
		}

		const descInputStyle = {
			float: 'left',
			marginLeft: '5vw',
			fontWeight: 'lighter',
			paddingBottom: '2vh'
		}

		const hrStyle = {
			border: '2px solid #36333C',
			marginLeft: '5vw',
			width: '75%'
		}
		const buttonStyles = {
			backgroundColor: 'transparent',
			rippleColor: '#36BA93',
			labelStyle: {
				color: '#36333C',
			}
		}


		const borderStyle = {
			border: '2px solid #36BA93',
			marginBottom: '2.5vh',
			marginTop: '4.5vh',
			marginRight: '5vw'
		}

		const darkButtonStyles = {
			backgroundColor: 'transparent',
			rippleColor: '#36333C',
			labelStyle: {
				color: '#36333C',
			}
		}


		const darkBorderStyle = {
			border: '2px solid #36333C',
			marginRight: '5vw'
		}

		return (
			<div>
				<Grid>
					<Row className="show-grid">
						<Col md={8} mdOffset={2}>
							<MuiThemeProvider>
								<Paper style={paperStyle} zDepth={3}>
									<Row className="show-grid">
										<Col md={10}>
				          					<TextField
				          						id="Title"
				          						style={titleInputStyle}
				          						underlineFocusStyle={inputStyles.underlineStyle}
												floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle}
				          						placeholder="Enter Worksheet Title"
				          						underlineShow={false}
				          						onChange={this.onTitleChange}
			          						/>
						          			<hr style={hrStyle}/>
				          					<TextField
				          						id="Desciption"
				          						style={descInputStyle}
				          						underlineFocusStyle={inputStyles.underlineStyle}
												floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle}
				          						placeholder="Enter Worksheet Description"
				          						underlineShow={false}
				          						onChange={this.onDescriptionChange}
			          						/>
		          						</Col>
		          						<Col md={2}>
											{!this.state.loading ?
							    				<div>
							        				 <MuiThemeProvider>
							        					<FlatButton
															label="Create"
															style={borderStyle}
															rippleColor={buttonStyles.rippleColor}
															backgroundColor={buttonStyles.backgroundColor}
															labelStyle={buttonStyles.labelStyle}
															hoverColor={buttonStyles.backgroundColor}
															onClick={this.handleSubmit}
														/>
													</MuiThemeProvider>

													<MuiThemeProvider>
														<FlatButton
															label="Cancel"
															style={darkBorderStyle}
															rippleColor={darkButtonStyles.rippleColor}
															backgroundColor={darkButtonStyles.backgroundColor}
															labelStyle={darkButtonStyles.labelStyle}
															hoverColor={darkButtonStyles.backgroundColor}
															onClick={this.handleCancel}
														/>
													</MuiThemeProvider>
												</div> :
												<div>
													<MuiThemeProvider>
														<CircularProgress
															size={0.5}
															color='#36BA93'
															style={{marginLeft: 15}}
														/>
													</MuiThemeProvider>
												</div>
											}
										</Col>
									</Row>
					    		</Paper>
				    		</MuiThemeProvider>
				    		<MuiThemeProvider>
								<Snackbar
						          open={this.state.error}
						          message="Title cannot be left blank."
						          autoHideDuration={4000}
						          onRequestClose={this.handleRequestClose}
	        					/>
        					</MuiThemeProvider>
			    		</Col>
		    		</Row>
	    		</Grid>
			</div>
		)
	}
}
export default WorksheetCreator

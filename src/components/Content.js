import React, { Component } from 'react';
import config from '../config';
import {load} from '../utils/spreadsheets';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Societe from './object/Societe';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { names } from './object/Skills';
import SearchIcon from '@material-ui/icons/Search';
import MapIcon from '@material-ui/icons/Map';
import EmailIcon from '@material-ui/icons/Email';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    typography: {
        useNextVariants: true,
      },
    paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    },
    root: {
    width: '100%',
    },
    grow: {
    marginLeft: 15
    },
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
          display: 'block',
      },
    },
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },

 containerNoresult:{
   marginTop: 40,
 },
 noResult:{
    fontSize :20,
    color:"#3F51B5",

 },
 progress: {
    margin: theme.spacing.unit * 2,
  },
 searchIcon: {
        width: theme.spacing.unit * 6,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
            width: 200,
            },
        },
    },
    contentModal:{
      marginTop: 10,
      marginBottom: 10
    },
    icon:{
        fontSize: 18,
        marginLeft: 10,
    },
    iconSend:{
        fontSize: 22,
        marginLeft: 10,
    },
    row:{
      float: "right",
      fontSize:14,
    },

      closeButton:{
        cursor:"pointer",
        position: "absolute",
        top: 5,
        fontSize: 25,
        opacity:1,
        transitionProperty: 'all',
        transitionDuration: '800ms',
        '&:hover':{
          transform: 'rotate(180deg)',

        }

    },
    containerSelect: {
    margin: theme.spacing.unit,
    display:'flex',
    minWidth: 120,
    width:"100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  labelSelect:{
    textAlign:"left",
    color:'white'
  },
  selectSkill:{
    color:theme.palette.common.white,

    '&::before':{
      borderColor:theme.palette.common.white,
      '&:hover': {
        borderColor:theme.palette.common.white,
      },
    },
    '& svg':{
      color:theme.palette.common.white,
    },
  },

  chip:{
    fontSize:14,
    textTransform:"uppercase",
    margin: theme.spacing.unit / 4,
    color : theme.palette.common.white,

  },
  formControl: {
   margin: theme.spacing.unit,
   minWidth: 120,
   maxWidth: 300,
   '&:hover':{
     borderColor:theme.palette.common.white
   }
 },
 chips: {
   display: 'flex',
   flexWrap: 'wrap',
   marginTop: 25
 },
 optionSkill:{
   textTransform:'uppercase'
 },


});

class Content extends Component {

  onLoad = (data, error) => {
    if (data) {
      this.setState({
        rows: data.rows
      });
    } else {
      this.setState({ error});
    }
  };


  componentDidMount() {
  // 1. Load the JavaScript client library.
  window.gapi.load("client", this.initClient);
  }


  initClient = () => {
  // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
      // 3. Initialize and make the API request.
      load(this.onLoad);
    });
  };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: {},
            rows: [],
            error: null,
            searchKeywords: "",
            searchTown: "",
            skill: [],
            anchorEl: null,

        }
    }

    handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

    handleChangeSkill = (name) => {
      console.log(name)
      if(this.state.skill.indexOf(name) < 0){
        this.state.skill.push(name);
      }else{
        this.state.skill.forEach(function(el,index,array){
          if(el===name){
            array.splice(index,1)
          }
        })
      }
      this.setState({skill:this.state.skill})
      this.renderChip();
    };

    renderChip(){
      if(this.state.skill !== ""){
        return(
        this.state.skill.map(value => (
          <Chip key={value} color="primary" label={value} onDelete={this.handleDelete}  className={this.props.classes.chip}  />
        ))
      )

      }
    }

    handleChangeKey(e){
        let regex= /([A-Za-z0-9éèùúáàóòíìâêîôûäëïöüç& ])/g;
        if(e.target.value && e.target.value.match(regex)){
        this.setState({searchKeywords: e.target.value.match(regex).join('')});
        }else{
            this.setState({searchKeywords: ""});
        }
    };

    handleChangeTown(e){
        let regex= /([A-Za-z0-9éèùúáàóòíìâêîôûäëïöüç ])/g;
        if(e.target.value && e.target.value.match(regex)){
            this.setState({searchTown: e.target.value.match(regex).join('')});
        }else{
            this.setState({searchTown: ""});

        }

    }

    data(test){
        this.setState({data: test})
        this.handleOpen()
    }

    handleOpen(){
        this.setState({ open: true });
    };

    handleClose(){
        this.setState({ open: false });
    };

    handleDelete = event => {
      this.state.skill.forEach(function(el,index,array){
        if(el===event.currentTarget.previousElementSibling.innerHTML){
          array.splice(index,1)
        }
      })
      this.setState({skill:this.state.skill})
      this.renderChip();
      }

    renderContent(){
      if(this.state.rows.length === 0){
        return(
          <div className={this.props.classes.containerNoresult}>
              <CircularProgress size={70} className={this.props.classes.progress} />
          </div>
        )
      }
      else{
        let filterKeywords = this.state.rows.filter((row) => {
            let search = row.name+ ' '+ row.skills;
            return search.toLowerCase().match(this.state.searchKeywords);
        }).filter((town) => {
            let result = town.city;
            return result.toString().toLowerCase().match(this.state.searchTown);
        });

        if(this.state.skill.length !== 0){
          this.state.skill.forEach(function(el){
            filterKeywords = filterKeywords.filter((skill) => {
                let search = skill.skills;
                return search.toLowerCase().match(el);
            });
          })
        }
        if(filterKeywords.length === 0){
         return(
           <div className={this.props.classes.containerNoresult}>
              <Typography className={this.props.classes.contentNoResults} component="p">
                <span className={this.props.classes.noResult}>No results found.</span>
              </Typography>
            </div>
          )
        }else{
          const listSociete = filterKeywords.map((row, i) =>  {
            return (
              <Societe
                  key={i}
                  societe={row}
                  data={this.data.bind(this)}
              />
            )
          })
          return listSociete;
        }

      }

    }



    render() {
      const { anchorEl } = this.state;
        const {  error } = this.state;
        const { classes } = this.props;
        if (error) {
          return <div>{this.state.error}</div>;
        }

        return (
            <div>
              <div>
              <AppBar position="static">
               <Toolbar className="barResponsive">
                 <Typography className={classes.title}  color="inherit" noWrap>
                   Research a keyword :
                 </Typography>
                 <div className={classes.search + " inputResponsive"}>
                   <div className={classes.searchIcon}>
                     <SearchIcon />
                   </div>
                   <InputBase
                     placeholder="Search…"
                     type="text"
                     value={this.state.searchKeywords}
                     onChange={this.handleChangeKey.bind(this)}
                     classes={{
                       root: classes.inputRoot,
                       input: classes.inputInput,
                     }}
                   />
                 </div>
                 <div className={classes.search + " inputResponsive"}>
                   <div className={classes.searchIcon}>
                     <MapIcon />
                   </div>
                   <InputBase
                     placeholder="Location.."
                     type="text"
                     value={this.state.searchTown}
                     onChange={this.handleChangeTown.bind(this)}
                     classes={{
                       root: classes.inputRoot,
                       input: classes.inputInput,
                     }}
                   />
                 </div>
                 <div className = {classes.containerSelect + " select-responsive"}>

                    { /*<Select
                       multiple
                       value={this.state.skill}
                       name="test"
                       className= {classes.selectSkill}
                       onChange={this.handleChangeSkill}
                       renderValue={selected => (
                          <div className={classes.chips}>
                            {selected.map(value => (
                            <div>""</div>
                            ))}
                          </div>
                        )}

                       MenuProps={MenuProps}
                     >
                     console.log(selected)
                       {names.map(name => (
                         <MenuItem className={classes.optionSkill} key={name} value={name}>
                           <Checkbox checked={this.state.skill.indexOf(name) > -1} />
                           <ListItemText primary={name} />
                         </MenuItem>
                       ))}
                     </Select>*/}

                     <Button
                        onClick={this.handleClickMenu}
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        className="menuSelect"
                      >
                        Select your skill
                      </Button>
                      <Menu
                        id="simple-menu"
                        onClose={this.handleCloseMenu}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                      >
                       {names.map(name => (

                         <MenuItem
                           className={classes.optionSkill}
                           key={name}
                           value={name}
                           button={Boolean(true)}
                           onClick={()=>this.handleChangeSkill(name)}
                           >
                           <Checkbox checked={this.state.skill.indexOf(name) > -1}  value={name}/>
                           <ListItemText primary={name}  value={name}/>
                         </MenuItem>
                       ))}
                     {/*</Select>*/}
                     </Menu>


                  </div>
               </Toolbar>
             </AppBar>
                </div>
                <div className={classes.chips}>
                {this.renderChip()}
                </div>

                <div className="cards">
                  {this.renderContent()}
                </div>
                <Modal
                    className="modal"
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                >
                    <div style={getModalStyle()} className={classes.paper + " modal-responsive"}>
                    <div className="date">
                        <Typography variant="title" id="modal-title">
                            <span>{this.state.data.name}</span>
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description" color="textSecondary">
                            <span>{this.state.data.horodateur}</span>
                            <ClearIcon className={classes.closeButton} onClick={()=>this.handleClose()} />
                        </Typography>
                    </div>
                        <hr />
                        <Typography className={classes.contentModal} variant="subheading">
                            <b>Location:</b> <span className={classes.row}>{this.state.data.city}</span>
                        </Typography>
                        <Typography className={classes.contentModal} variant="subheading">
                            <b>How many interns:</b> <span className={classes.row}>{this.state.data.interns}</span>
                        </Typography>
                        <Typography className={classes.contentModal} variant="subheading">
                            <b>Contact name:</b> <span className={classes.row}>{this.state.data.contact}</span>
                        </Typography>
                        <Typography className={classes.contentModal} variant="subheading">
                            <b>Email:</b> <span className={classes.row}>{this.state.data.email}</span>
                        </Typography>
                        <Typography className={classes.contentModal} variant="subheading" >
                            <b>Phone number:</b> <span className={classes.row}><a href={'tel:' + this.state.data.phone}>{this.state.data.phone}</a></span>
                        </Typography>
                        <Typography className={classes.contentModal} variant="subheading">
                            <b>Job opportunity:</b> <span className={classes.row}>{this.state.data.hire}</span>
                        </Typography>
                        <hr />
                        <Typography className={classes.contentModal} variant="subheading">
                            <b className="description">Description:</b> <span><p>{this.state.data.skills}</p></span>
                        </Typography>
                        <br/>
                        <a className="emailButton" variant="subheading"  href={'mailto:' + this.state.data.email}>
                            Apply to the job
                            <EmailIcon className={classes.iconSend} />
                        </a>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(Content);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Button from '@material-ui/core/Button';
import '../../App';

const styles = {
    typography: {
        useNextVariants: true,
      },
    card: {
        minHeight: 0,
        minWidth: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },

    title: {
        marginBottom: 16,
        fontSize: 14,
    },

    content: {
        padding: 0,
    },

    cardContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        textAlign: "left",
    },

    contentInformation: {
        display: "flex",
        justifyContent: 'space-between',
    },

    infoName: {
        fontWeight: "bold",
        margin: 5,
    },

    info: {
        paddingLeft:40,
        margin: 5,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    pos: {
        display: "flex",
        marginTop: 25,
        fontSize:15,
        textAlign: "left",
        alignItems:"flex-end"
    },

    action: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 8,
        display: "flex",
        flexDirection: "column",
    },

    button: {
        backgroundColor: "#3F51B5",
        color: "white",
        // width: 130,
        padding: 10,
        '&:hover': {
            backgroundColor: "#1f285b",
          },
        '& span': {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            color: "white",
        }
    },
    icon:{
        fontSize : 22,
        marginRight : 5
    },
    dateInfo:{
      display:'flex',
      justifyContent: "space-between",
    }
};

class Societe extends Component{
    constructor(props) {
        super(props);

    }

    handleOpen(){
        this.props.data(this.props.societe);
    }
    renderDate(){
      if(this.props.societe.ending !== ''){
        return(
        <Typography className={this.props.classes.pos} color="textSecondary">
          <CalendarTodayIcon className={this.props.classes.icon} />  {this.props.societe.ending}
        </Typography>
        )
      }
    }

    renderDayLeft(){

      if(this.props.societe.timeLeft !== '' && this.props.societe.timeLeft > 0){
        return(
        <Typography className={this.props.classes.pos} color="textSecondary">
            {this.props.societe.timeLeft + " days left"}
        </Typography>
        )
      }
    }

    changeState(){
      let active;
      if(this.props.societe.timeLeft >= 0){
          active = true
      }
      else{
        active=false
      }
      return active
    }



    render(){
        const { classes } = this.props;
        return (
            <div className='societe'>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <div className="header">
                            <Typography noWrap component="h2" style={{color:'white'}}>
                                {this.props.societe.name}
                            </Typography>
                        </div>
                        <div className={classes.cardContent}>
                            <div>
                                <Typography className={classes.contentInformation} component="p">
                                    <span className={classes.infoName}>Location: </span>
                                    <span className={classes.info}>{this.props.societe.city}</span>
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.contentInformation} noWrap component="p">
                                    <span className={classes.infoName}>Interns needed: </span>
                                    <span className={classes.info}>{this.props.societe.interns}</span>
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.contentInformation} noWrap component="p">
                                    <span className={classes.infoName}>Description: </span>
                                    <span className={classes.info}>{this.props.societe.skills}</span>
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.contentInformation} noWrap component="p">
                                    <span className={classes.infoName}>Job opportunity : </span>
                                    <span className={classes.info}>{this.props.societe.hire}</span>
                                </Typography>
                            </div>
                            <div className={classes.dateInfo}>
                                <Typography className={classes.pos} color="textSecondary">
                                  <CalendarTodayIcon className={classes.icon} />  {this.props.societe.horodateur}
                                </Typography>
                                {/* {this.renderDate()}*/}
                                {this.renderDayLeft()}

                            </div>
                        </div>
                    </CardContent>
                    <CardActions className={classes.action}>
                        <Button className={classes.button} onClick={()=>this.handleOpen()}><InfoIcon className={classes.icon} />Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Societe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Societe);

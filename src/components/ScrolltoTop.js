import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: '3vh',
        backgroundColor: '#DCDCDC',
        color: 'black',
        "&:hover, &Mui-focusVisible": {
            transition: '0.3s',
            color: '#0ca620',
            backgroundColor: '#DCDCDC'
        },
        right: '4vh',
    }
}))

const Scroll = ({
    showBelow
}) => {

    const classes = useStyles();

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    })

    const handleClick = () => {
        window['scrollTo']({top: 0, behavior: 'smooth'})
    }

    return (
        <div>

            {show &&               
            <Tooltip title="Scroll to Top">
            <IconButton onClick={handleClick} className={classes.toTop} aria-label="ScrolltoTop">
                <ExpandLessIcon />
            </IconButton>
          </Tooltip>
            }

        </div>
    )

}

export default Scroll;
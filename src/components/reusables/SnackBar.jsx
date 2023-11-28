import {Button} from "@mui/material";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {enqueueSnackbar, MaterialDesignContent, SnackbarProvider} from 'notistack'
import {styled} from "@mui/material/styles";


export default function SnackBar() {
    const snackBarMessage = useSelector((state) => state.snackBar.message);
    const snackBarStatus = useSelector((state) => state.snackBar.success);
    const showSnackbar = useSelector((state) => state.snackBar.display);
    const dispatch = useDispatch();
    const notistackRef = useRef(null)



    const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
        '&.notistack-MuiContent-success': {
            backgroundColor: '#12B76A',
            fontSize: '14px',
            fontFamily:'DM Sans',
            color: 'white'
        },
        '&.notistack-MuiContent-error': {
            backgroundColor: '#F04438',
            fontSize: '14px',
            fontFamily:'DM Sans',
            color: 'white'
        },
    }));

    const showSnack = () => {
        enqueueSnackbar(snackBarMessage)
    }

    useEffect(()=> {
        if(showSnackbar){
            showSnack()
        }
    },[showSnackbar])

    /* this was initially for using watch to toggle the snackbar */
    let TIMER;
    function handleTimeout() {
        TIMER = setTimeout(() => {
            dispatch(updateSnackbar({type: "TOGGLE_SNACKBAR_CLOSE"}))
        }, 8000);
    }
    useEffect(() => {
        if (showSnackbar) {
            handleTimeout();
        }
        return () => {
            clearTimeout(TIMER);
        };
    }, [showSnackbar, TIMER]);

    return (
        <>
            <SnackbarProvider
               ref={notistackRef}
               anchorOrigin={{
                   vertical: 'bottom',
                   horizontal: 'right',
               }}
               Components={{
                   success: StyledMaterialDesignContent,
                   error: StyledMaterialDesignContent,
               }}
               action={(key) => (
                  <Button variant={'text'} sx={{color: 'white', fontSize: '12px', fontFamily:'DM Sans'}} onClick={() => { notistackRef.current.closeSnackbar(key); }}>
                      <div style={{fontSize: '12px', fontFamily:'DM Sans'}}>
                          Dismiss
                      </div>
                  </Button>
               )}

               variant={snackBarStatus ? 'success' : 'error'}/>

        </>


    )
}

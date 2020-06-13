import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CustomTextField = withStyles({
  root: {
    '& label': {
      color: '#ffff',
    },
    '& label.Mui-focused': {
      color: '#ffff',
    },
    '& .MuiOutlinedInput-root': {
      'color': '#ffff',
      '& fieldset': {
        borderColor: '#ffff',
      },
      '&:hover fieldset': {
        borderColor: '#ffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffff',
      },
    },
  },
})(TextField);

export default CustomTextField;

import { Mention, MentionsInput } from 'react-mentions';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomMentionsTextField = ({
  containerRef,
  value,
  onChange,
  placeholder,
  data,
  InputProps,
  ...other
}) => {
  const theme = useTheme();

  const defaultStyle = {
    input: {
      margin: 0,
      marginTop: 5,
      border: 0,
      outline: 0,
    },
    suggestions: {
      list: {
        border: `1px solid ${theme.palette.divider}`,
      },
      item: {
        padding: theme.spacing(1),
        '&focused': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  };

  return (
    <TextField
      {...other}
      multiline={false}
      InputProps={{
        inputComponent: MentionsInput,
        inputProps: {
          value,
          onChange,
          placeholder,
          style: defaultStyle,
          suggestionsPortalHost: containerRef?.current,
          onKeyDown: (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();

              if (other?.handleKeyDown) {
                other.handleKeyDown();
              }
            }
          },
          children: (
            <Mention
              trigger={'@'}
              data={data}
              displayTransform={(id, display) => `@${display}`}
              style={{
                backgroundColor: theme.palette.grey[300],
              }}
            />
          ),
        },
        ...InputProps,
      }}
    />
  );
};

export default CustomMentionsTextField;

import {Box, CircularProgress} from "@mui/material";

interface Props {
  isLoading: boolean;
}

const Spinner:React.FC<Props> = ({isLoading}) => {
  return isLoading && (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
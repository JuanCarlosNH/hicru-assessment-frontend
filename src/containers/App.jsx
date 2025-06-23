import PositionViewContainer from "./PositionViewContainer";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PositionViewContainer/>
      </ThemeProvider>
    </div>
  );
}

export default App;

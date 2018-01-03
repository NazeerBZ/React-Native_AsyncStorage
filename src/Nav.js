import { StackNavigator } from 'react-navigation';
import { Login, Signup } from './components/index.js';
import Main from './components/Main.js';

const Nav = StackNavigator(
    {
        login: {
            screen: Login
        },

        signup: {
            screen: Signup
        },

        main: {
            screen: Main
        }
    },

    {
        navigationOptions: {
            header: null
        }
    }
)

export default Nav;


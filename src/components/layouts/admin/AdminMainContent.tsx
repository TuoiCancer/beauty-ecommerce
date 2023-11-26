import { styled } from '@mui/material'
import { drawerWidth } from './RootAdminLayout'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

interface MainContentProp extends MuiAppBarProps {
	open?: boolean
}

interface IAdminMainContentProps {
  children: React.ReactNode,
  open: boolean
}

const Main = styled('main', {
	shouldForwardProp: prop => prop !== 'open'
})<MainContentProp>(({ theme, open }) => ({
	flexGrow: 1,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
	})
}))

const AdminMainContent: React.FunctionComponent<IAdminMainContentProps> = ({
  children,
  open
}) => {
  return <Main open={open}>{children}</Main>
};

export default AdminMainContent;
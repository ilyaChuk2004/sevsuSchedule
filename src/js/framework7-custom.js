
import Framework7, { request, utils, getDevice, createStore } from 'framework7';
import Toast from 'framework7/components/toast';
import Preloader from 'framework7/components/preloader';
import Progressbar from 'framework7/components/progressbar';
import Sortable from 'framework7/components/sortable';
import Swipeout from 'framework7/components/swipeout';
import ContactsList from 'framework7/components/contacts-list';
import VirtualList from 'framework7/components/virtual-list';
import Card from 'framework7/components/card';
import Form from 'framework7/components/form';
import Input from 'framework7/components/input';
import Checkbox from 'framework7/components/checkbox';
import Radio from 'framework7/components/radio';
import Toggle from 'framework7/components/toggle';
import Range from 'framework7/components/range';
import Grid from 'framework7/components/grid';
import Calendar from 'framework7/components/calendar';
import InfiniteScroll from 'framework7/components/infinite-scroll';
import PullToRefresh from 'framework7/components/pull-to-refresh';
import DataTable from 'framework7/components/data-table';
import Fab from 'framework7/components/fab';
import Messages from 'framework7/components/messages';
import Messagebar from 'framework7/components/messagebar';
import Notification from 'framework7/components/notification';
import Tooltip from 'framework7/components/tooltip';
import Skeleton from 'framework7/components/skeleton';
import Elevation from 'framework7/components/elevation';
import Typography from 'framework7/components/typography';
import Accordion from 'framework7/components/accordion';
import Searchbar from 'framework7/components/searchbar';
import LoginScreen from 'framework7/components/login-screen';
import Swiper from 'framework7/components/swiper';

Framework7.use([
  Toast,
  Preloader,
  Progressbar,
  Sortable,
  Swipeout,
  ContactsList,
  VirtualList,
  Card,
  Form,
  Input,
  Checkbox,
  Radio,
  Toggle,
  Range,
  Grid,
  Calendar,
  InfiniteScroll,
  PullToRefresh,
  DataTable,
  Fab,
  Messages,
  Messagebar,
  Notification,
  Tooltip,
  Skeleton,
  Elevation,
  Typography,
  Accordion,
  Searchbar,
  LoginScreen,
  Swiper
]);

export default Framework7;
export { request, utils, getDevice, createStore };

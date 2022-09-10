
import Framework7, { request, utils, getDevice, createStore } from 'framework7';
import Autocomplete from 'framework7/components/autocomplete';
import Dialog from 'framework7/components/dialog';
import Toast from 'framework7/components/toast';
import Preloader from 'framework7/components/preloader';
import Progressbar from 'framework7/components/progressbar';
import Input from 'framework7/components/input';
import PullToRefresh from 'framework7/components/pull-to-refresh';
import Fab from 'framework7/components/fab';
import Tooltip from 'framework7/components/tooltip';
import Typography from 'framework7/components/typography';
import Accordion from 'framework7/components/accordion';
import Swiper from 'framework7/components/swiper';

Framework7.use([
  Autocomplete,
  Dialog,
  Toast,
  Preloader,
  Progressbar,
  Input,
  PullToRefresh,
  Fab,
  Tooltip,
  Typography,
  Accordion,
  Swiper
]);

export default Framework7;
export { request, utils, getDevice, createStore };

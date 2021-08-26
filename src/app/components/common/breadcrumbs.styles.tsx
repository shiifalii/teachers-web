import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
  },
  styledBreadcrumbs: {
    padding: '1em 0 0 0',
    fontSize: '12px',
    color: '#fff',
    '@media (max-width: 768px)': {
      display: 'none',
    },
    '& .MuiBreadcrumbs-separator': {
      margin: 0,
    },
    '& .MuiTypography-colorPrimary': {
      color: '#fff',
    },
    '& .MuiLink-underlineHover': {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  link: {
    cursor: 'pointer',
  },
});

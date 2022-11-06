/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { NewsType } from '../../../globalTypes/newsType';
import NewsService from '../../../Services/FetchNews';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
type PostData = {
  id?: string
  publisher?: {
      name?: string
      homepage_url?: string
      logo_url?: string
      favicon_url?: string
  },
  title?: string
  author?: string
  published_utc?: string
  article_url?: string
  tickers?: string[]
  amp_url?: string
  image_url?: string
  description?: string
  keywords?: string[]
};
const SinglePost = () => {
    const [expanded, setExpanded] = React.useState(true);
    const { id } = useParams();
    const [news, setNews] = React.useState<NewsType>();
    React.useEffect(() => {
        (async () => {
            const fetchedCups = await NewsService.fetchNews();
            setNews(fetchedCups);
          })();
        }, []);
       const singlePostData = news?.results?.map((el) => {
        if (el.id === id) {
          const newsPostData: PostData = {
            title: el?.title,
            author: el?.author,
            published_utc: el?.published_utc,
            image_url: el?.image_url,
            article_url: el?.article_url,
            description: el?.description,
            tickers: el?.tickers,
            publisher: {
              name: el.publisher.name,
              favicon_url: el?.publisher?.favicon_url,
              homepage_url: el?.publisher?.homepage_url,
              logo_url: el?.publisher?.logo_url,
            },
          };
          return newsPostData;
        }
       });
       const filteredPostData = singlePostData?.filter((element) => element !== undefined);
       const postData = filteredPostData?.map((el) => ({
        el,
       }));
    const handleExpandClick = () => {
        setExpanded((prev) => !prev);
    };
    return (
      <Box
        sx={{
              width: '60%',
              m: 'auto',
            }}
      >
        <Card
          sx={{
            ml: '10px',
            mr: '10px',
            mt: '10px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35) ;',
          }}
        >
          <CardHeader
            avatar={(
              <Avatar
                sx={{ width: '70px', height: '70px' }}
                imgProps={{
                  sx: { objectFit: 'contain' },
                  }}
                src={postData && `${postData[0].el?.publisher?.logo_url}`}
                alt="error"
                aria-label="recipe"
              />
        )}
            action={(
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
        )}
            title={postData && postData[0].el?.publisher?.name}
            subheader={postData && postData[0].el?.published_utc}
          />
          <CardMedia
            className="image"
            component="img"
            height="194"
            image={postData && postData[0].el?.image_url}
            sx={{ padding: '1em 1em 0 1em', objectFit: 'cover' }}
            alt="error"
          />
          <CardContent>
            <Typography paragraph>
              {postData && postData[0].el?.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {postData && postData[0].el?.description}
              </Typography>
              <Typography paragraph>
                <a href={`${postData && postData[0].el?.article_url}`}>
                  Article
                </a>
              </Typography>
              <Typography paragraph>
                Author:
                {' '}
                {postData && postData[0].el?.author}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
        );
};

export default SinglePost;

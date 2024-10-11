import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MediaGallery.css'
interface MediaItem {
  Key: string;
  MediaType: 'image' | 'video';
  MediaURL: string;
  Uploader: string;
}

function MediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [continuationToken, setContinuationToken] = useState<string | null>(null);

  const fetchMedia = async () => {
    const params = new URLSearchParams({
      limit: '12',
      ...(continuationToken && { continuationToken }),
    });
    const response = await fetch(`https://bnbhu7h8gb.execute-api.us-west-1.amazonaws.com/prod/listFiles?${params}`);
    const data = await response.json();
    console.log(data)

    setItems([...items, ...data.items]);
    setContinuationToken(data.continuationToken);
    setHasMore(!!data.continuationToken);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className='content' id="scrollableDiv">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMedia}
        hasMore={hasMore}
        loader={<h4>Cargando...</h4>}
        scrollThreshold="50px"
        scrollableTarget="scrollableDiv"
      >
        <div className="media-grid">
          {items.map((item) => (
            <div key={item.Key} className="media-item">
              {item.MediaType === 'image' ? (
                <img src={item.MediaURL} alt="" />
              ) : item.MediaType === 'video' ? (
                  <video controls={true} src={item.MediaURL} className='video-item'>
                  </video>
              ) : null}
            </div>
            
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default MediaGallery;

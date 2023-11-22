import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME} from '../queries';
import { REMOVE_BOOK } from '../mutations';

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      setUserData(data.removeBook);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>{userData.savedBooks?.length ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:` : 'You have no saved books!'}</h2>
      {userData.savedBooks.map((book) => {
        return (
          <div key={book.bookId} className='mb-3 card'>
            <h4 className='card-header'>{book.title} {book.authors && `by ${book.authors.join(', ')}`}</h4>
            <div className='card-body'>
              <div className='row'>
                {book.image && (
                  <div className='col-2'>
                    <img src={book.image} alt={`The cover for ${book.title}`} />
                  </div>
                )}
                <div className={`${book.image ? 'col-10' : 'col-12'}`}>
                  <p>{book.description}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <a href={book.link} target='_blank' rel='noopener noreferrer'>See Book</a>
                  <button className='ml-2 btn btn-primary' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SavedBooks;

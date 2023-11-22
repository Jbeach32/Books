import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME} from '../queries';
import { SAVE_BOOK } from '../mutations';

const SearchBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [saveBook] = useMutation(SAVE_BOOK);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(data?.me?.savedBooks.map((book) => book.bookId) || []);

  useEffect(() => {
    if (data) {
      setSavedBookIds(data.me.savedBooks.map((book) => book.bookId));
    }
  }, [data]);

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    try {
      const { data } = await saveBook({
        variables: { book: bookToSave },
      });

      setSavedBookIds(data.saveBook.savedBooks.map((book) => book.bookId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>{savedBookIds?.length ? `Viewing ${savedBookIds.length} saved ${savedBookIds.length === 1 ? 'book' : 'books'}:` : 'You have no saved books!'}</h2>
      {data.me.savedBooks.map((book) => {
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
                  <button className='ml-2 btn btn-primary' onClick={() => handleSaveBook(book.bookId)}>
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

export default SearchBooks;


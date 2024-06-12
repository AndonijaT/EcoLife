import React, { useState, useEffect } from 'react';
import './QuotesSection.css'; 

interface Quote {
  text: string;
  author: string;
  isEditable: boolean; 
}

const initialQuotes: Quote[] = [
  { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan", isEditable: false },
  { text: "We do not inherit the Earth from our ancestors; we borrow it from our children.", author: "Native American Proverb", isEditable: false },
  { text: "Sustainability is no longer about doing less harm. It's about doing more good.", author: "Jochen Zeitz", isEditable: false }
];

const QuotesSection: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const savedQuotes = localStorage.getItem('quotes');
    return savedQuotes ? JSON.parse(savedQuotes) : initialQuotes;
  });

  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  const handleAddQuote = () => {
    if (newQuote && newAuthor) {
      const newQuoteObject: Quote = { text: newQuote, author: newAuthor, isEditable: true };
      setQuotes([...quotes, newQuoteObject]);
      setNewQuote('');
      setNewAuthor('');
    } else {
      alert("Please fill in both the quote and the author fields.");
    }
  };

  const handleDeleteQuote = (index: number) => {
    const updatedQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(updatedQuotes);
  };

  const handleEditQuote = (index: number) => {
    const quoteToEdit = quotes[index];
    const newText = prompt("Edit the quote text:", quoteToEdit.text);
    const newAuthor = prompt("Edit the author:", quoteToEdit.author);

    if (newText && newAuthor) {
      const updatedQuotes = quotes.map((quote, i) =>
        i === index ? { ...quote, text: newText, author: newAuthor } : quote
      );
      setQuotes(updatedQuotes);
    }
  };

  return (
    <div className="quotes-section">
      <h2>Inspirational Quotes</h2>
      <div className="quotes-list">
        {quotes.map((quote: Quote, index: number) => (
          <div key={index} className="quote-card">
            <p>"{quote.text}"</p>
            <p>- {quote.author}</p>
            {quote.isEditable && (
              <div className="buttons">
                <button className="edit-btn" onClick={() => handleEditQuote(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteQuote(index)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-quote-form">
        <input
          type="text"
          placeholder="Enter quote"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={handleAddQuote}>Add Quote</button>
      </div>
    </div>
  );
};

export default QuotesSection;

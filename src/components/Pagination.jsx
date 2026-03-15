function Pagination({ page, hasNext, hasPrevious, onPageChange }) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={!hasPrevious}>
        Forrige
      </button>

      <span>Side {page}</span>

      <button onClick={() => onPageChange(page + 1)} disabled={!hasNext}>
        Neste
      </button>
    </div>
  );
}

export default Pagination;

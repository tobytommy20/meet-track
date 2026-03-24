"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Pagination(_a) {
    var page = _a.page, totalPages = _a.totalPages, setPage = _a.setPage;
    return (<div className="pagination">
      <button disabled={page === 1} onClick={function () { return setPage(page - 1); }}>
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button disabled={page === totalPages} onClick={function () { return setPage(page + 1); }}>
        Next
      </button>
    </div>);
}
exports.default = Pagination;

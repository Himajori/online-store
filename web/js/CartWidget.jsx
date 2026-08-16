/* global React, ReactDOM, getCartLines, getCartCount, getCartTotal, formatMoney, setCartQuantity */

const { useState, useEffect } = React;

function CartWidget() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  function refresh() {
    setLines(typeof getCartLines === "function" ? getCartLines() : []);
    setCount(typeof getCartCount === "function" ? getCartCount() : 0);
    setTotal(typeof getCartTotal === "function" ? getCartTotal() : 0);
  }

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener("cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    document.addEventListener("visibilitychange", onUpdate);
    return () => {
      window.removeEventListener("cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
      document.removeEventListener("visibilitychange", onUpdate);
    };
  }, []);

  function changeQty(id, value) {
    if (typeof setCartQuantity !== "function") return;
    const result = setCartQuantity(id, value);
    if (result && result.ok === false) {
      setError(result.error);
    } else {
      setError("");
    }
  }

  return (
    <div className="react-cart">
      <button
        type="button"
        className="cart-link react-cart-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Cart <span>{count}</span>
      </button>

      {open && (
        <div className="react-cart-panel" role="dialog" aria-label="Cart preview">
          <div className="react-cart-head">
            <strong>Your cart</strong>
            <button type="button" className="react-cart-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>

          {error ? <p className="message error">{error}</p> : null}

          {lines.length === 0 ? (
            <p className="react-cart-empty">No items yet.</p>
          ) : (
            <ul className="react-cart-list">
              {lines.map((line) => (
                <li key={line.id}>
                  <div>
                    <p className="react-cart-name">{line.name}</p>
                    <p className="react-cart-meta">
                      {formatMoney(line.price)} · On hand {line.onHand}
                    </p>
                    {line.exceedsStock ? (
                      <p className="message error stock-inline">
                        Exceeds on-hand stock ({line.onHand}).
                      </p>
                    ) : null}
                  </div>
                  <input
                    className="qty-input"
                    type="number"
                    min="0"
                    max={line.onHand}
                    value={line.quantity}
                    aria-label={`Quantity for ${line.name}`}
                    onChange={(e) => changeQty(line.id, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="react-cart-foot">
            <p className="react-cart-total">Total: {formatMoney(total)}</p>
            <a className="btn btn-primary" href="cart.html">
              Open cart page
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

const rootEl = document.getElementById("react-cart-root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<CartWidget />);
}

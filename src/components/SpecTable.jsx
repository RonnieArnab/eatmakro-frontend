import React from 'react';

export function SpecTable({ bowl, size }) {
  return (
    <section className="sec" id="box">
      <div className="marker mono">{bowl[size].net} g</div>
      <h2>Six things, each one weighed.</h2>
      <p className="lede">
        Nothing is scooped by eye. Every component goes on the scale before it goes in the
        dabba, and the box is weighed again once it is sealed.
      </p>
      <table className="spec">
        <caption className="mono">
          {bowl.name} · {size} portion · cooked weights · batch HYD·0417
        </caption>
        <thead>
          <tr><th scope="col">Component</th><th scope="col" className="g">Weight</th></tr>
        </thead>
        <tbody>
          {bowl.items.map(([name, grams, colour, note]) => (
            <tr key={name}>
              <th scope="row">
                <span className="dot" style={{ background: colour }} />{name}
                <div className="note">{note}</div>
              </th>
              <td className="g mono">{grams} g</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><th scope="row">Net weight</th><td className="g mono">{bowl[size].net} g</td></tr>
        </tfoot>
      </table>
      <p>
        The dabba itself is stainless steel and it is ours. Your rider takes yesterday's back
        when today's arrives, so nothing about this meal is disposable except the sticker.
      </p>
    </section>
  );
}

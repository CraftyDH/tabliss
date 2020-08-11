import React, { FC } from 'react';

import { engines } from './engines';
import { Props, defaultData } from './types';

const SearchSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <label>
      Search Provider
      <select
        onChange={event =>
          setData({ ...data, searchEngine: event.target.value })
        }
        value={data.searchEngine}
      >
        {engines.map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
        <option key="custom" value="custom">
          Custom
        </option>
      </select>
      {data.searchEngine === "custom" && (
        <label>
          Example: {'https://www.google.com/search?q={searchTerms}'}
          <input
            type="url"
            value={data.customSearchEngine}
            onChange={event =>
              setData({
                ...data,
                customSearchEngine: String(event.target.value),
              })
          }
          />
        </label>
      )}
    </label>

    {process.env.BUILD_TARGET !== 'firefox' && (
      <label>
        Suggestions Provider
        <select
          onChange={event =>
            setData({ ...data, suggestionsEngine: event.target.value })
          }
          value={data.suggestionsEngine}
        >
          <option key="off" value="">
            Off
          </option>
          {engines
            .filter(({ suggest_url }) => Boolean(suggest_url))
            .map(({ key, name }) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          <option key="custom" value="custom">
            Custom
          </option>
        </select>
      </label>
    )}

    {data.suggestionsEngine === "custom" && (
        <label>
          Example: {'https://www.google.com/complete/search?client=chrome&q={searchTerms}&callback={callback}'}
          <input
            type="url"
            value={data.customSuggestionsEngine}
            onChange={event =>
              setData({
                ...data,
                customSuggestionsEngine: String(event.target.value),
              })
          }
          />
        </label>
    )}

    {data.suggestionsEngine && (
      <label>
        Suggestion Quanitity
        <input
          type="number"
          min="1"
          max="10"
          value={data.suggestionsQuantity}
          onChange={event =>
            setData({
              ...data,
              suggestionsQuantity: Number(event.target.value),
            })
          }
        />
      </label>
    )}
  </div>
);

export default SearchSettings;

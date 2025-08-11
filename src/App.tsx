import { useState } from "react";
import "./App.css";
import type { Roster } from "./types/roster";

function App() {
    const [inputJson, setInputJson] = useState("");
    const [outputJson, setOutputJson] = useState("");
    const [multiplier, setMultiplier] = useState(1);
    const [error, setError] = useState("");

    const modifyRoster = () => {
        try {
            const roster: Roster = JSON.parse(inputJson);

            // Create a deep copy of the roster
            const modifiedRoster: Roster = JSON.parse(JSON.stringify(roster));

            // Modify each player's skills
            modifiedRoster.players = roster.players.map((player) => ({
                ...player,
                skills: {
                    awr: Math.round(player.skills.awr * multiplier),
                    pas: Math.round(player.skills.pas * multiplier),
                    run: Math.round(player.skills.run * multiplier),
                    skl: Math.round(player.skills.skl * multiplier),
                    spd: Math.round(player.skills.spd * multiplier),
                },
            }));

            // Update modified date
            modifiedRoster.dateModified = Date.now();

            setOutputJson(JSON.stringify(modifiedRoster, null, 2));
            setError("");
        } catch (err) {
            setError("Invalid JSON input");
            setOutputJson("");
        }
    };

    return (
        <div className="container">
            <h1>CFB Roster Modifier</h1>

            <div className="control-panel">
                <label>
                    Skill Multiplier: {multiplier.toFixed(2)}x
                    <input
                        type="range"
                        min="0.5"
                        max="20"
                        step="0.25"
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                    />
                </label>

                <button onClick={modifyRoster}>Modify Roster</button>
            </div>

            <div className="json-containers">
                <div className="json-container">
                    <h2>Input Roster JSON</h2>
                    <textarea
                        value={inputJson}
                        onChange={(e) => setInputJson(e.target.value)}
                        placeholder="Paste your roster JSON here..."
                    />
                </div>

                <div className="json-container">
                    <h2>Output Roster JSON</h2>
                    <textarea
                        value={outputJson}
                        readOnly
                        placeholder="Modified roster will appear here..."
                    />
                </div>
            </div>

            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default App;

# Logical binary functions catalogue

| Index | Truth Table | Function Name           | Symbol*** |  DNF & CNF *************************************** | Inverse Function Name   | Inverse Symbol |
|-------|-------------|-------------------------|-----------|-------------------------------------------------|-------------------------|----------------|
| 0     | 0000        | Contradiction           | ⊥         | 0                                               | Tautology               | ⊤              |
| 1     | 0001        | AND                     | P ∧ Q     | P ∧ Q <br> (P ∨ Q) ∧ (P ∨ ¬Q) ∧ (¬P ∨ Q)        | NAND                    | P ↑ Q          |
| 2     | 0010        | Nonimplication          | P /→ ¬Q   | P ∧ ¬Q <br> (P ∨ Q) ∧ (P ∨ ¬Q) ∧ (¬P ∨ ¬Q)      | Converse Implication    | P ← Q          |
| 3     | 0011        | P                       | P         | P                                               | ¬P                      | ¬P             |
| 4     | 0100        | Converse Nonimplication | ¬P /→ Q   | ¬P ∧ Q <br> (P ∨ Q) ∧ (¬P ∨ Q) ∧ (¬P ∨ ¬Q)      | Implication             | P → Q          |
| 5     | 0101        | Q                       | Q         | Q                                               | NOT Q                   | ¬Q             |
| 6     | 0110        | XOR                     | P ⊕ Q    | ¬P ∧ Q ∨ P ∧ ¬Q <br> (P ∨ Q) ∧ (¬P ∨ ¬Q)        | XNOR                    | P = Q          |
| 7     | 0111        | OR                      | P ∨ Q     | ¬P ∧ Q ∨ P ∧ ¬Q ∨ P ∧ Q <br> (P ∨ Q)            | NOR                     | P ↓ Q          |
| 8     | 1000        | NOR                     | P ↓ Q     | ¬P ∧ ¬Q <br> (P ∨ ¬Q) ∧ (¬P ∨ Q) ∧ (¬P ∨ ¬Q)    | OR                      | P ∨ Q          |
| 9     | 1001        | XNOR                    | P = Q     | ¬P ∧ ¬Q ∨ P ∧ Q <br> (P ∨ ¬Q) ∧ (¬P ∨ Q)        | XOR                     | P ⊕ Q         |
| 10    | 1010        | NOT Q                   | ¬Q        | ¬Q                                              | Q                       | Q              |
| 11    | 1011        | Converse Implication    | P ← Q     | ¬P ∧ ¬Q ∨ P ∧ ¬Q ∨ P ∧ Q <br> (P ∨ ¬Q)          | Nonimplication          | P /→ ¬Q        |
| 12    | 1100        | NOT P                   | ¬P        | ¬P                                              | P                       | P              |
| 13    | 1101        | Implication             | P → Q     | ¬P ∧ ¬Q ∨ ¬P ∧ Q ∨ P ∧ Q <br> (¬P ∨ Q)          | Converse Nonimplication | P ← Q          |
| 14    | 1110        | NAND                    | P ↑ Q     | ¬P ∧ ¬Q ∨ ¬P ∧ Q ∨ P ∧ ¬Q <br> (¬P ∨ ¬Q)        | AND                     | P ∧ Q          |
| 15    | 1111        | Tautology               | ⊤         | 1                                               | Contradiction           | ⊥              |

import assert from "node:assert/strict";
import test from "node:test";
import { completionPercent, missingRequiredItems } from "../src/lib/birth";
import type { BirthRiteItemView } from "../src/lib/domain";

const items: BirthRiteItemView[] = [
  { id: "1", code: "GENESIS", title: "Genesis", required: true, completed: true, sortOrder: 0 },
  { id: "2", code: "KEYS", title: "Chaves", required: true, completed: false, sortOrder: 1 },
  { id: "3", code: "NOTE", title: "Nota", required: false, completed: false, sortOrder: 2 },
];

test("rito calcula somente itens obrigatórios", () => {
  assert.equal(completionPercent(items), 50);
  assert.deepEqual(missingRequiredItems(items).map((item) => item.code), ["KEYS"]);
});

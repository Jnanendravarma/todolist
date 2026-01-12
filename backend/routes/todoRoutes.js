import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error);
      return res.status(500).json({ error: error.message });
    }
    
    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ADD todo
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, completed: false }])
      .select();

    if (error) {
      console.error("Error creating todo:", error);
      return res.status(500).json({ error: error.message });
    }
    
    res.json(data[0]);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE todo
router.put("/:id", async (req, res) => {
  try {
    const { completed } = req.body;

    const { data, error } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", req.params.id)
      .select();

    if (error) {
      console.error("Error updating todo:", error);
      return res.status(500).json({ error: error.message });
    }
    
    res.json(data[0]);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("Error deleting todo:", error);
      return res.status(500).json({ error: error.message });
    }
    
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

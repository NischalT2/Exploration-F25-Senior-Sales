"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

// import components
import Uploadbox from "@/root/components/uploadbox";
import Dropdown from "@/root/components/dropdown";
import Input from "@/root/components/input";

export default function Home() {
  // dropdown options
  const categories = [
    { value: "Clothing", label: "Clothing" },
    { value: "Electronics/Appliances", label: "Electronics" },
    { value: "School supplies", label: "Books" },
    { value: "Furniture", label: "Furniture" },
    { value: "Accessories", label: "Accessories" },
    { value: "Decor", label: "Decor" },
  ];

  const conditions = [
    { value: "New with tags", label: "New with tags" },
    { value: "Like new", label: "Like new" },
    { value: "Lightly used", label: "Lightly used" },
    { value: "Moderately used", label: "Moderately used" },
    { value: "Heavily used", label: "Heavily used" },
  ];

  const sizes = [
    { value: "XXS", label: "XXS" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "One Size", label: "One Size" },
    { value: "N/A", label: "N/A" },
  ];

  // form state
  const [category, setCategory] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [priceError, setPriceError] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  // submit status
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  // dropdown handlers
  const handleCategorySelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleSizeSelect = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  const handleConditionSelect = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };

  // managing form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;

    setSubmitError("");
    setSubmitSuccess("");
    setPriceError("");

    // validation for price
    if (!price || isNaN(Number(price))) {
      setPriceError("Please enter a valid numeric price");
      return;
    }

    try {
      const form = new FormData(formEl);

      // controlled fields 
      form.set("item_name", itemName);
      form.set("category", category);
      form.set("brand_name", brandName);
      form.set("price", price || "0");
      form.set("size", size);
      form.set("condition", condition);
      form.set("item_description", itemDescription);
      form.set("image_url", imageUrl);

      // attach file if present
      if (file) {
        form.append("file", file);
      }

      const res = await fetch("/api/listings", {
        method: "POST",
        body: form,
      });

      const text = await res.text();
      let json: unknown = null;

      if (text) {
        try {
          json = JSON.parse(text);
        } catch (parseErr) {
          console.warn("Non-JSON response from /api/listings:", text);
        }
      }

      if (!res.ok) {
        let msg: string | undefined;

        if (json && typeof json === "object") {
          const j = json as { error?: string; message?: string };
          msg = j.error || j.message;
        }

        msg = msg || text || `${res.status} ${res.statusText}`;

        console.error("API error", msg, json);
        setSubmitError(msg || "Submission failed");
        return;
      }

      // reset form and state upon success
      formEl.reset();
      setCategory("");
      setSize("");
      setPrice("");
      setCondition("");
      setItemName("");
      setBrandName("");
      setItemDescription("");
      setImageUrl("");
      setFile(null);

      setSubmitSuccess("Listing submitted successfully!");
    } catch (err) {
      console.error(err);
      setSubmitError((err as Error).message || "Something went wrong");
    }
  };

  const priceHasError = !price || Boolean(priceError);

  return (
    <>
      {/* header section */}
      <Box
        component="header"
        sx={{
          bgcolor: "#A51C30",
          color: "common.white",
          py: 3,
          textAlign: "center",
          borderRadius: 0,
          mb: 0,
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Crimson Corner
        </Typography>
        <Typography variant="h6">
          <i>Upload a listing by filling out the fields below!</i>
        </Typography>
      </Box>

      {/* form section */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          maxWidth: 700,
          width: "100%",
          mx: "auto",
          mt: 0,
          gap: 0,
          p: 1,
        }}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* item name input */}
        <Input
          id="itemName"
          label="Item name"
          value={itemName}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setItemName(e.target.value)}
          required
          placeholder=""
          helperText="Please enter item name"
        />

        {/* category dropdown */}
        <Dropdown
          id="category"
          label="Category"
          options={categories}
          value={category}
          onChange={handleCategorySelect}
          required
          helperText="Please choose a category"
        />

        {/* brand name input */}
        <Input
          id="brandName"
          label="Brand name"
          value={brandName}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setBrandName(e.target.value)}
          required
          placeholder=""
          helperText="Please enter brand name"
        />

        {/* price input */}
        <Box sx={{ m: 1, width: "100%" }}>
          <TextField
            required
            id="price"
            label="Price"
            type="text"
            placeholder="0.00"
            fullWidth
            value={price}
            onChange={(e) => {
              const v = e.target.value;
              setPrice(v);
              if (priceError) setPriceError("");
            }}
            onBlur={() => {
              if (price && !isNaN(Number(price))) {
                const formatted = Number(price).toFixed(2);
                if (formatted !== price) setPrice(formatted);
              }
            }}
            error={ priceHasError }
            helperText={
              priceError || (!price ? "Please enter price" : "")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            inputProps={{ inputMode: "decimal" }}
          />
        </Box>

        {/* condition input */}
        <Dropdown
          id="condition"
          label="Condition"
          options={conditions}
          value={condition}
          onChange={handleConditionSelect}
          required
          helperText="Please choose a condition"
        />

        {/* size dropdown */}
        <Dropdown
          id="size"
          label="Select size"
          options={sizes}
          value={size}
          onChange={handleSizeSelect}
          required
          helperText="Please choose a size"
        />

        {/* item description input */}
        <Input
          id="itemDescription"
          label="Item description"
          value={itemDescription}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setItemDescription(e.target.value)}
          required
          placeholder=""
          helperText="Please enter item description"
          multiline
          rows={4}
        />

        {/* file upload */}
        <Uploadbox
          onFileSelect={(selectedFile: File) => {
            setFile(selectedFile);
            setUploadError("");
          }}
        />
        {uploadError && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {uploadError}
          </Typography>
        )}

        {/* submit error/success messages */}
        {submitError && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 1, textAlign: "center" }}
          >
            {submitError}
          </Typography>
        )}
        {submitSuccess && (
          <Typography
            variant="body2"
            color="success.main"
            sx={{ mt: 1, textAlign: "center" }}
          >
            {submitSuccess}
          </Typography>
        )}

        {/* submit button */}
        <Box
          sx={{
            m: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#A51C30",
              color: "white",
              padding: "10px 20px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Submit Listing
          </button>
        </Box>
      </Box>
    </>
  );
}

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function RiskManagementApp() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    likelihood: "",
    impact: "",
    mitigation: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords([...records, { ...form, id: Date.now() }]);
    setForm({ title: "", description: "", likelihood: "", impact: "", mitigation: "" });
  };

  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Risk Management Record System</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="title">Risk Title</Label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="likelihood">Likelihood (e.g., Low/Medium/High)</Label>
          <Input id="likelihood" name="likelihood" value={form.likelihood} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="impact">Impact (e.g., Low/Medium/High)</Label>
          <Input id="impact" name="impact" value={form.impact} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Risk Description</Label>
          <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="mitigation">Mitigation Measures</Label>
          <Textarea id="mitigation" name="mitigation" value={form.mitigation} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2 text-right">
          <Button type="submit">Add Record</Button>
        </div>
      </form>

      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{record.title}</h2>
                  <p className="text-sm text-gray-600">Likelihood: {record.likelihood} | Impact: {record.impact}</p>
                  <p className="mt-2"><strong>Description:</strong> {record.description}</p>
                  <p className="mt-2"><strong>Mitigation:</strong> {record.mitigation}</p>
                </div>
                <Button variant="destructive" onClick={() => handleDelete(record.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

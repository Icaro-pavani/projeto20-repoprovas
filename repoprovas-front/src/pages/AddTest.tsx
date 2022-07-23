import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import Form from "../components/Form";
import api, { Category, Discipline, Teacher } from "../services/api";

const styles = {
  container: {
    marginTop: "50px",
    width: "700px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: { marginBottom: "30px" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { marginBottom: "16px", textAlign: "left" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

interface FormData {
  name: string;
  pdfUrl: string;
  categoryId: string;
  teacherId: string;
}

function AddTest() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [teachers, setTeachers] = useState<{ teacher: Teacher }[]>([]);
  const { setMessage } = useAlert();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    pdfUrl: "",
    categoryId: "",
    teacherId: "",
  });
  const [disciplineId, setDisciplineId] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: categoriesData } = await api.getCategories(token);
      setCategories(categoriesData.categories);
      const { data: disciplinesData } = await api.getDisciplines(token);
      setDisciplines(disciplinesData.disciplines);
    }
    loadPage();
  }, [token]);

  useEffect(() => {
    async function loadTeachers() {
      if (!token) return;
      if (!disciplineId) {
        setDisable(true);
      } else {
        const idNumberDiscipline: number = Number(disciplineId);
        const { data: teachersData } = await api.getTeachersByDiscipline(
          token,
          idNumberDiscipline
        );
        setTeachers(teachersData.teachers);
        setDisable(false);
      }
    }

    loadTeachers();
  }, [disciplineId, token]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (
      !formData?.name ||
      !formData?.pdfUrl ||
      !formData?.categoryId ||
      !disciplineId ||
      !formData?.teacherId
    ) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { name, pdfUrl, categoryId, teacherId } = formData;

    const testData = {
      name,
      pdfUrl,
      categoryId: parseInt(categoryId),
      disciplineId: parseInt(disciplineId),
      teacherId: parseInt(teacherId),
    };

    try {
      console.log(`${token}`);
      await api.postTest(testData, `${token}`);
      setMessage({ type: "success", text: "Prova adicionada com sucesso!" });
      navigate("/app/disciplinas");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }

  return (
    <>
      <TextField
        sx={{ marginX: "auto", marginBottom: "25px", width: "450px" }}
        label="Pesquise por disciplina"
      />
      <Divider sx={{ marginBottom: "35px" }} />
      <Box
        sx={{
          marginX: "auto",
          width: "700px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/app/disciplinas")}
          >
            Disciplinas
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/app/pessoas-instrutoras")}
          >
            Pessoa Instrutora
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/app/adicionar")}
          >
            Adicionar
          </Button>
        </Box>
        <Typography
          fontWeight="bold"
          sx={{ marginTop: "50px", fontSize: "24px" }}
        >
          Adicone uma prova
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Box sx={styles.container}>
            <TextField
              name="name"
              sx={styles.input}
              label="Nome da prova"
              type="text"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.name}
            />
            <TextField
              name="pdfUrl"
              sx={styles.input}
              label="Link da prova"
              onChange={handleInputChange}
              value={formData.pdfUrl}
            />
            <TextField
              select
              name="categoryId"
              sx={styles.input}
              label="Categoria"
              onChange={handleInputChange}
              value={formData.categoryId}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={`${category.id}`}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name="disciplineId"
              sx={styles.input}
              label="Disciplina"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDisciplineId(e.target.value);
              }}
              value={disciplineId}
            >
              {disciplines.map((discipline) => (
                <MenuItem key={discipline.id} value={`${discipline.id}`}>
                  {discipline.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name="teacherId"
              sx={styles.input}
              label="Professor"
              onChange={handleInputChange}
              value={formData.teacherId}
              disabled={disable}
            >
              {teachers.map((teacher) => (
                <MenuItem
                  key={teacher.teacher.id}
                  value={`${teacher.teacher.id}`}
                >
                  {teacher.teacher.name}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={styles.actionsContainer}>
              <Button variant="contained" type="submit" sx={{ width: "700px" }}>
                Enviar
              </Button>
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  );
}

export default AddTest;

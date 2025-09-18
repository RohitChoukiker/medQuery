
from langchain.vectorstores import Chroma
from langchain.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
import os

DATA_PATH = "data/"
CHROMA_PATH = "chroma_db/"

def load_and_split_docs():
    docs = []
    for filename in os.listdir(DATA_PATH):
        if filename.endswith((".pdf", ".txt")):
            loader = UnstructuredFileLoader(os.path.join(DATA_PATH, filename))
            docs += loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=50)
    return splitter.split_documents(docs)

def ingest():
    split_docs = load_and_split_docs()
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = Chroma.from_documents(split_docs, embedding_model, persist_directory=CHROMA_PATH)
    vectordb.persist()
    print("Ingestion Complete!")

if __name__ == "__main__":
    ingest()

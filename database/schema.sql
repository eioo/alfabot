--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.5

-- Started on 2018-10-17 16:30:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 34980)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    "chatId" bigint NOT NULL,
    weather jsonb DEFAULT '{"cities": [], "enableNotifications": false}'::jsonb
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 35050)
-- Name: reminders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reminders (
    id integer NOT NULL,
    chatid bigint NOT NULL,
    "timestamp" bigint NOT NULL,
    text character varying NOT NULL,
    asker character varying NOT NULL
);


ALTER TABLE public.reminders OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 35048)
-- Name: reminders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reminders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reminders_id_seq OWNER TO postgres;

--
-- TOC entry 2807 (class 0 OID 0)
-- Dependencies: 197
-- Name: reminders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reminders_id_seq OWNED BY public.reminders.id;


--
-- TOC entry 2677 (class 2604 OID 35053)
-- Name: reminders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminders ALTER COLUMN id SET DEFAULT nextval('public.reminders_id_seq'::regclass);


--
-- TOC entry 2679 (class 2606 OID 35006)
-- Name: chats chats_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_un UNIQUE ("chatId");


-- Completed on 2018-10-17 16:31:00

--
-- PostgreSQL database dump complete
--


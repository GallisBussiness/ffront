import { Paper } from '@mui/material';
import { Accordion,AccordionTab } from 'primereact/accordion';
import { useState } from 'react';

const Faq = () => {

    const [activeIndex,setActiveIndex] = useState(0);

  return (
    <>
      <div className="my-4 mx-10 bg-slate-200">
    <Paper className="px-10 my-3">
    <div className="text-bold text-4xl text-center text-primary my-4">
       FAQ
    </div>
    <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
    <AccordionTab header="Q1 : L’abonnement commence à courir à partir de quand ?">
    L’abonnement commence à courir à partir du jour où le payement est effectué.
    </AccordionTab>
    <AccordionTab header=" Q2 : Combien de temps dure la période d’essai ? ">
    La période d’essai dure 30 jours, soit l’équivalent d’un mois calendaire.
    </AccordionTab>
    <AccordionTab header=" Q3 : Qu’est-ce qui différencie le pack gratuit, de la version d’essai d’un mois ? ">
    La version d’essai d’un mois n’est valable que pour les packs Classique et Premium. Les essais des packs Classique et Premium sont caractérisés par une utilisation complète et intégrale de tous les services proposés par freedocteur pendant une durée de 30 jours. Le pack gratuit, quant à lui, est une formule que nous proposons en illimité aux praticiens qui souhaitent utiliser la plateforme en version expérimentation sans durée précise. Le pack gratuit est limité en termes de fonctionnalités (notifications et nombre mensuel de rendez-vous).
    </AccordionTab>
    <AccordionTab header=" Q4 : Pourrais-je inscrire des notes médicales non visibles par les autres médecins et le patient lui-même ? ">
    Nous proposons aux médecins d’inscrire deux types de notes médicales dans les carnets de santé des patients. Il s’agit d’une note médicale visible par le patient (et tout autre médecin devant consulter le carnet de santé du patient sur autorisation de ce dernier) et d’une autre qui n’est visible que par le médecin.
    </AccordionTab>
    <AccordionTab header=" Q5 : Nous sommes plusieurs médecins dans le cabinet, que faire ? ">
    Il existe deux formules possibles :
        Première formule :
        Chaque médecin crée son compte et gère lui-même (ou sa secrétaire) ses rendez-vous médicaux en ligne.
        Seconde formule :
    Nous proposons un pack pour les cabinets avec plusieurs médecins de différentes spécialités. Les comptes et agendas des médecins du cabinet sont gérés par un Administrateur chargé d’organiser et de suivre les rendez-vous médicaux des médecins. Toutefois chaque médecin dispose d’un compte lui permettant de suivre ses rendez-vous avec ses patients.
    </AccordionTab>
    <AccordionTab header=" Q6 : Pourrais-je combiner l’agenda freedocteur avec Google Agenda ? ">
    Non, ce n’est pas possible de combiner l’agenda freedocteur avec celui de Google Agenda car les systèmes utilisés ne sont pas identiques.
    </AccordionTab>
    <AccordionTab header="Q7 : Comment mes données seront protégées ? ">
    Les informations recueillies sur le site sont enregistrées dans un fichier informatisé par freedocteur dans le cadre de votre demande d’ouverture de compte. Ces données seront utilisées pour vous contacter dans le cadre de vos rendez-vous médicaux. Conformément au code de protection des données personnelles en vigueur au Sénégal (loi 2008-12), freedocteur garantit à ses utilisateurs (patients et médecins) un droit d’accès total à leurs données, un droit de rectification ou de retrait de leur consentement l’exploitation de leurs données.
    </AccordionTab>
    <AccordionTab header="Q8 : Je craints de ne pas respecter le Code de déontologie des médecins ? ">
    Il n’y a pas de crainte à ce niveau dans la mesure où nous ne faisons pas de la publicité, ni du démarchage (comme l’interdit l’article 10 du Code de déontologie médicale applicable au Sénégal) pour le médecin. Le service porte exclusivement sur la prise de rendez-vous médicaux en ligne. Nous permettons aux médecins de faciliter la gestion de leurs agendas et de satisfaire au mieux leur patientèle en leur faisant bénéficier d’une expérience utilisateur totalement bénéfique pour leur santé.
    </AccordionTab>
    <AccordionTab header="Q9 : Votre service correspond à de la publicité, alors qu’un médecin ne doit pas faire de la publicité. ">
    Nous ne faisons pas de la publicité, nous sommes un intermédiaire qui facilite l’accès des patients aux médecins. freedocteur fournit, par l’intermédiaire de son site internet www.freedocteur.com , un service en ligne de mise en relation de praticiens et de patients. freedocteur n’est, dans ce contexte, qu’un intermédiaire entre le patient et le praticien. Nos actions de communication sont orientées sur la plateforme freedocteur afin que les patients s’y connectent pour trouver leurs médecins et prendre directement rendez-vous avec eux.
    </AccordionTab>
    <AccordionTab header="Q10 : Je suis déjà sur une autre plateforme de prise de rendez-vous médicaux en ligne ">
    Il est tout à fait possible d’allier les deux plateformes. Les plateformes de prise de rendez-vous médicaux sont des canaux permettant de faciliter l’accès aux médicaux. Toutefois, freedocteur présente les avantages compétitifs suivants :
nous allions plusieurs fonctionnalités (notifications sms et emails, géolocalisations et suivi du carnet de santé des patients, facturation, etc.) ;
nous respectons totalement le Code de protection des données personnelles (loi 2008-12) applicable au Sénégal ainsi que les standards internationaux applicables à notre secteur ;
nous disposons d’un service de suivi clientèle, personnalisé avec un chargé de clientèle pour chaque médecin. Ce dernier est l’interlocuteur privilégié du médecin et est chargé de suivre l’utilisation du praticien et de ses patients.
nous disposons d’un service d’assistance technique disponible 24h/24 et 7j/J
    </AccordionTab>
    <AccordionTab header="Q11 : J’ai déjà mis en place un service de prise de rendez-vous médicaux en ligne. ">
    En plus de vous permettre de gérer vos propres patients, freedocteur vous donne accès à des milliers d’autres patients à travers le Sénégal et l’Afrique. Ce qui vous permet de bénéficier d’un large panel d’usager des services sanitaires
    </AccordionTab>
    <AccordionTab header="Q12 : Comment votre plateforme pourrait-elle me permettre de donner des rendez-vous médicaux en ligne ">
    freedocteur fournit, par l’intermédiaire de son site internet https://www.freedocteur.com , un service en ligne de mise en relation de praticiens et de patients. Il est important que les médecins remplissent leurs profils, en précisant toutes les informations nécessaires à leur description et à leurs spécialités pour que les patients puissent avoir une certaine confiance. Par ailleurs, les médecins doivent remplir (une fois, lors de la première utilisation de nos services) leurs agendas pour que les patients puissent les consulter et prendre des rendez-vous médicaux depuis la plateforme.
    </AccordionTab>
</Accordion>
</Paper>
</div>
    </>
  )
}

export default Faq
import React, { useCallback, useEffect, useRef, useState } from 'react';

import api from '~/services/api';

import Table, { Edit } from '~/components/Table';
import Modal from '~/components/Modal';

import { Container } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const modalRef = useRef(null);
  const [currentProblem, setCurrentProblem] = useState();

  useEffect(() => {
    async function fetchDeliveries() {
      const response = await api.get('/delivery/problems');

      if (response) {
        setProblems(response.data);
      }
    }
    fetchDeliveries();
  }, []);

  const afterDelete = useCallback(
    (id) => {
      setProblems(problems.filter((problem) => problem.id !== id));
    },
    [problems, setProblems]
  );

  return (
    <Container>
      <Modal ref={modalRef} data={currentProblem}>
        <strong>VISUALIZAR PROBLEMA</strong>
        {currentProblem ? <p>{currentProblem.description}</p> : ''}
      </Modal>
      <h1>Problemas na Entrega</h1>
      <Table>
        <>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Açōes</th>
            </tr>
          </thead>
          <tbody>
            {problems
              ? problems.map((problem) => {
                  return (
                    <tr key={problem.id}>
                      <td>#{problem.delivery.id}</td>
                      <td>{problem.description}</td>
                      <td>
                        <Edit
                          afterDelete={() => afterDelete(problem.id)}
                          beforeModalOpen={() => setCurrentProblem(problem)}
                          modalRef={modalRef}
                          resource={`/problem/${problem.id}/cancel-delivery`}
                          problem
                        />
                      </td>
                    </tr>
                  );
                })
              : ''}
          </tbody>
        </>
      </Table>
    </Container>
  );
}
